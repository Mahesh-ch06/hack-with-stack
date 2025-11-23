# Note to Participants

You are welcome to **build your own project idea** instead of choosing from the problem statements listed below.
## Problem Statements and Participant Note

# **Note to Participants**

You are welcome to **build your own project idea** instead of choosing from the problem statements listed below.

However, your solution **must include both of the following components**:

1. **AI / Machine Learning**
    
	(For prediction, classification, OCR, recommendation, pattern analysis, anomaly detection, etc.)
    
2. **Ethereum Blockchain**
    
	(For smart contracts, verification, escrow, identity, supply chain tracking, or immutable logging)
    
Projects will be judged on:

- Strong **AI model integration**
- **Secure and gas-efficient** Ethereum smart contract implementation
- **Practical real-world usability**
- Clean UI/UX and end-to-end workflow

### **Certificate Form**

All participants **must submit their project details through the certificate form** to receive participation or winner certificates.

**Submit the form here:**

# Problem Statement’s

## **Problem Statement 1: Decentralized Academic Credential Verification with AI Authenticity Scoring**

### **Context**

Academic fraud is growing. Students present fake certificates during admissions, job applications, or scholarship verifications. Traditional verification is slow, manual, and prone to errors.

### **Challenge**

Develop a **Full-Stack decentralized credential verification platform** where:

- Institutions upload or issue student certificates
- Certificates are **hashed and stored on Ethereum** to ensure immutability
- Recruiters / Universities can scan and verify authenticity instantly
- **AI/ML model** evaluates the formatting, stamps, and content to detect *possible forgery* or anomalies

### **Requirements**

1. **User Roles**
- Institution (Upload Issue Certificates)
- Student (View / Share Certificates)
- Verifier (Check Certificate Validity)
1. **AI Component**
- OCR to extract text from uploaded certificate PDFs
- ML Model to score:
	- Layout similarity
	- Seal / logo match
	- Signature authenticity likelihood
1. **Ethereum Component**
- Store certificate hash on Ethereum (not full file)
- Public verification contract interface
- Proof-of-Integrity check
1. **Frontend / Backend**
- Certificate viewer dashboard
- Verification QR link sharable on resume / LinkedIn
- REST or GraphQL backend for role flows

### **Deliverable Impact**

- Eliminates certificate forgery
- Enables easy and transparent verification globally

---

## **Problem Statement 2: Smart Micro-Lending System with AI Risk Rating and Ethereum Escrow**

### **Context**

Millions of small borrowers lack formal credit scores. Lenders face trust issues. Banks reject them.

### **Challenge**

Build a **Peer-to-Peer Micro-Lending Web Platform** where:

- Borrowers request small loans
- Lenders fund them
- AI predicts borrower repayment probability based on profile & transaction history
- Ethereum Smart Contracts handle **escrow, interest, lock-in and penalties**

### **Requirements**

1. **AI Component**
- Train/Use ML model to classify borrower as Low/Medium/High risk
- Explainable output (why the model gave that score)
1. **Ethereum Component**
- Loan escrow smart contract
- Auto interest calculation and lock-in rules
- On-time repayment incentives and delayed repayment penalties
1. **Core System**
- Borrower/Lender dashboards
- Transaction summary
- Repayment timeline tracking
- Transparent risk score visibility

### **Deliverable Impact**

- Creates trust without intermediaries
- Gives financial access to unbanked individuals

---

## **Problem Statement 3: Decentralized Freelance Work Marketplace with AI Skill & Price Match**

### **Context**

Freelancing platforms take high commission and matching between clients and freelancers is inefficient.

### **Challenge**

Create a **Web3-based Freelance Marketplace** where:

- Freelancers list skills & previous work
- Clients post job requirements
- AI matches freelancer suitability based on skills, complexity & price fit
- Ethereum Contracts manage escrow payments & dispute resolution

### **Requirements**

1. **AI Component**
- NLP-based similarity scoring between:
	- Job requirements
	- Freelancer portfolios & skill tags
- Recommendation engine ranking top freelancers
1. **Ethereum Component**
- Escrow contract for work milestones
- Automatic payment release on approval
- Rating stored immutably to prevent manipulation
1. **Full-Stack System**
- Client & Freelancer dashboards
- Real-time chat / communication interface
- Proposal / Offer workflow

### **Deliverable Impact**

- Fair, transparent, commission-free freelancing ecosystem

---

## **Problem Statement 4: Medical Prescription Reader with Blockchain-based Drug Authenticity Tracking**

### **Context**

Fake drugs enter supply chains and handwritten prescriptions often cause incorrect medicine dispensing.

### **Challenge**

Build a **Pharmacy Management System** that:

- Uses **AI OCR** to read handwritten prescriptions
- Suggests medicines from database with dosage & brand alternatives
- Tracks medicine batch & source using **Ethereum smart contracts**

### **Requirements**

1. **AI Component**
- OCR + NLP to parse doctor’s handwriting
- Identify medicine name and dosage fields automatically
1. **Ethereum Component**
- Record each medicine batch supply chain lifecycle
- Verify drug authenticity & origin before dispensing
1. **Application**
- Pharmacy dashboard
- Prescription upload & verification UI
- Alerts if drug is counterfeit or expired batch is detected

### **Deliverable Impact**

- Reduces misdiagnosis and counterfeit drug circulation

---

## **Problem Statement 5: Smart Solid Waste Management & Payment Transparency System**

### **Context**

Cities face waste overflow due to irregular collection and accountability gaps.

### **Challenge**

Create a **Smart Waste Collection Dashboard** where:

- Citizens upload bin images
- AI detects bin fill-level
- Collection requests get automatically scheduled
- Completion logs stored on Ethereum for transparency

### **Requirements**

1. **AI Component**
- Image classification to determine waste overflow level
- Predictive analysis for collection scheduling
1. **Ethereum Component**
- Immutable record of completed pickups, timestamps, staff IDs
- Prevents corruption and fake reporting
1. **Application**
- Citizen request portal
- Municipal officer dashboard
- Live completion tracking map

### **Deliverable Impact**

- Efficient waste management + corruption-free reporting

---

# **Prize Bounty Announcement**

> The team demonstrating the most efficient, secure & well-integrated Ethereum Smart Contract implementation will receive a $100 Prize.
> 

Scoring focus:

1. Gas-efficiency
2. Contract security
3. Front-end + blockchain interaction clarity
4. Real-world usability
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a991537d-c7d0-4134-877a-e7085683ab96

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a991537d-c7d0-4134-877a-e7085683ab96) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a991537d-c7d0-4134-877a-e7085683ab96) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
