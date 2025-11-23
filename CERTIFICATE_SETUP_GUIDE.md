# Certificate Portal Setup Guide

## How to Make Certificates Work in Real-Time

### Option 1: Google Sheets + API (Recommended - Easy & Free)

#### Step 1: Create Google Sheet
1. Create a Google Sheet with these columns:
   - Name
   - Email
   - Team Name
   - Certificate Type (participation/winner/runner-up)
   - Certificate ID
   - Project Title
   - Certificate URL (link to the certificate PDF in Google Drive)

#### Step 2: Make it Public
1. Click "Share" → "Anyone with the link can view"
2. Go to File → Share → Publish to web → CSV
3. Copy the published URL

#### Step 3: Update the Code
Replace the `certificatesDatabase` in `src/pages/Certificates.tsx` with this API call:

```typescript
const [certificates, setCertificates] = useState<Certificate[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchCertificates = async () => {
    try {
      const response = await fetch('YOUR_GOOGLE_SHEET_CSV_URL');
      const text = await response.text();
      
      // Parse CSV
      const rows = text.split('\n').slice(1); // Skip header
      const parsedCertificates = rows.map(row => {
        const [name, email, teamName, certificateType, certificateId, projectTitle, downloadUrl] = row.split(',');
        return {
          name,
          email,
          teamName,
          certificateType: certificateType as "participation" | "winner" | "runner-up",
          certificateId,
          projectTitle,
          downloadUrl
        };
      }).filter(cert => cert.name); // Remove empty rows
      
      setCertificates(parsedCertificates);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setLoading(false);
    }
  };

  fetchCertificates();
}, []);
```

---

### Option 2: Firebase (Real-time Updates)

#### Step 1: Install Firebase
```bash
npm install firebase
```

#### Step 2: Setup Firebase
1. Go to https://console.firebase.google.com/
2. Create a new project
3. Enable Firestore Database
4. Get your config from Project Settings

#### Step 3: Create Firebase Config
Create `src/lib/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

#### Step 4: Update Certificates.tsx
```typescript
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const searchCertificates = async (searchTerm: string) => {
  const certificatesRef = collection(db, 'certificates');
  const q = query(certificatesRef);
  const querySnapshot = await getDocs(q);
  
  const results = querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() } as Certificate))
    .filter(cert => 
      cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  return results;
};
```

---

### Option 3: Backend API with Database

#### Step 1: Create Backend (Node.js/Express)
```javascript
// server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage (use a real database in production)
let certificates = [];

// Search certificates
app.get('/api/certificates/search', (req, res) => {
  const { query } = req.query;
  const results = certificates.filter(cert =>
    cert.name.toLowerCase().includes(query.toLowerCase()) ||
    cert.email.toLowerCase().includes(query.toLowerCase()) ||
    cert.certificateId.toLowerCase().includes(query.toLowerCase())
  );
  res.json(results);
});

// Add certificate (admin only)
app.post('/api/certificates', (req, res) => {
  const certificate = req.body;
  certificates.push(certificate);
  res.json({ success: true, certificate });
});

app.listen(3001, () => {
  console.log('API running on http://localhost:3001');
});
```

#### Step 2: Update Frontend to Call API
```typescript
const handleSearch = async () => {
  const response = await fetch(
    `http://localhost:3001/api/certificates/search?query=${searchQuery}`
  );
  const results = await response.json();
  setSearchResults(results);
};
```

---

## How to Upload Certificates

### Method 1: Google Drive (Simple)

1. **Generate Certificates**: Create PDF certificates using Canva, Photoshop, or certificate generators
2. **Upload to Google Drive**: Create a folder and upload all certificates
3. **Make Files Public**: Right-click each file → Share → Anyone with link can view
4. **Get Download Links**: Copy the shareable link for each certificate
5. **Update Google Sheet**: Paste the links in the "Certificate URL" column

**Convert Google Drive link to direct download:**
- Original: `https://drive.google.com/file/d/FILE_ID/view`
- Direct: `https://drive.google.com/uc?export=download&id=FILE_ID`

### Method 2: Firebase Storage

```typescript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

const uploadCertificate = async (file: File, certificateId: string) => {
  const storageRef = ref(storage, `certificates/${certificateId}.pdf`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
```

### Method 3: Cloud Storage (AWS S3, Cloudinary)

For AWS S3:
```bash
npm install aws-sdk
```

```typescript
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: 'YOUR_ACCESS_KEY',
  secretAccessKey: 'YOUR_SECRET_KEY'
});

const uploadToS3 = async (file: File) => {
  const params = {
    Bucket: 'your-bucket-name',
    Key: `certificates/${file.name}`,
    Body: file,
    ACL: 'public-read'
  };
  
  const result = await s3.upload(params).promise();
  return result.Location; // Public URL
};
```

---

## Admin Panel for Bulk Upload

Create `src/pages/Admin.tsx` for certificate management:

```typescript
import { useState } from 'react';
import * as XLSX from 'xlsx';

const Admin = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Upload to your backend/database
    jsonData.forEach(async (row: any) => {
      await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(row)
      });
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <input 
        type="file" 
        accept=".xlsx,.xls,.csv"
        onChange={handleExcelUpload}
      />
    </div>
  );
};
```

---

## Quick Start Recommendation

**For immediate setup (no coding required):**

1. **Create Google Sheet** with participant data
2. **Upload certificates to Google Drive**
3. **Get share links** for each certificate
4. **Publish Google Sheet as CSV**
5. **Update the fetch URL** in Certificates.tsx

This method is:
- ✅ Free
- ✅ No backend needed
- ✅ Easy to update (just edit the sheet)
- ✅ Works immediately

**Need help implementing any of these? Let me know which option you prefer!**
