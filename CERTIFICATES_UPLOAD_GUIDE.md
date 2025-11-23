# How to Add Your 60 Certificates

## Step 1: Prepare Your Certificate PDFs

1. Create/generate all 60 certificate PDFs
2. Name them consistently (e.g., `HWS2025-PAR-001.pdf`, `HWS2025-WIN-001.pdf`)
3. Copy all PDF files to: `public/certificates/` folder

Example:
```
public/
  certificates/
    HWS2025-PAR-001.pdf
    HWS2025-PAR-002.pdf
    HWS2025-WIN-001.pdf
    ...
```

---

## Step 2: Update Certificate Data

### Option A: Using Admin Panel (Easiest)

1. Navigate to `/admin` on your website
2. Download the Excel template
3. Fill in all 60 certificates with these columns:
   - **name**: Participant's full name
   - **email**: Participant's email
   - **teamName**: Team name
   - **certificateType**: "participation", "winner", or "runner-up"
   - **certificateId**: Unique ID (e.g., HWS2025-PAR-001)
   - **projectTitle**: Project name
   - **downloadUrl**: Path to PDF (e.g., /certificates/HWS2025-PAR-001.pdf)
4. Upload the Excel file
5. Click "Export JSON"
6. Replace the content of `public/certificates-data.json` with the exported JSON

### Option B: Manual JSON Edit

Edit `public/certificates-data.json`:

```json
[
  {
    "name": "Participant Name",
    "email": "email@example.com",
    "teamName": "Team Name",
    "certificateType": "participation",
    "certificateId": "HWS2025-PAR-001",
    "projectTitle": "Project Title",
    "downloadUrl": "/certificates/HWS2025-PAR-001.pdf"
  },
  {
    "name": "Another Participant",
    "email": "another@example.com",
    "teamName": "Team Beta",
    "certificateType": "winner",
    "certificateId": "HWS2025-WIN-001",
    "projectTitle": "Winning Project",
    "downloadUrl": "/certificates/HWS2025-WIN-001.pdf"
  }
  // ... add all 60 certificates
]
```

---

## Step 3: Test Locally

1. Run: `npm run dev`
2. Go to `/certificates`
3. Search for a participant name
4. Click "Preview Certificate" to verify everything works
5. Test the download button

---

## Certificate Types

Use these exact values for `certificateType`:
- `"participation"` - Regular participation certificate (⭐ Blue)
- `"winner"` - Winner certificate (🏆 Gold)
- `"runner-up"` - Runner-up certificate (🥈 Silver)

---

## File Structure

```
public/
├── certificates/           ← Put all 60 PDF files here
│   ├── HWS2025-PAR-001.pdf
│   ├── HWS2025-PAR-002.pdf
│   └── ... (all PDFs)
└── certificates-data.json  ← Certificate information
```

---

## Tips

1. **Consistent Naming**: Use the same certificate ID in both the filename and JSON
2. **File Paths**: Always start with `/certificates/` in downloadUrl
3. **Backup**: Keep a copy of your Excel file for future reference
4. **Testing**: Test search with different criteria (name, email, ID)

---

## Need Help?

The system automatically:
- ✅ Loads certificates from `certificates-data.json`
- ✅ Provides search functionality
- ✅ Shows preview with certificate details
- ✅ Enables direct download
- ✅ Works without any database

Just update the JSON file and deploy - that's it! 🚀
