import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ExternalLink, Download, Users, Award, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const Problems = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container-wide py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 min-w-0 flex-1"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center p-2 shadow-md">
                <img 
                  src="/logo.png" 
                  alt="AIML Club Logo" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Hack with Stack</h1>
                <p className="text-sm text-muted-foreground">AIML Club • Problem Statements 2025</p>
              </div>
            </motion.div>
            
            <nav className="flex items-center gap-2 ml-4 mobile-stack">
              <Link 
                to="/" 
                className="btn-secondary text-sm px-4 py-2 touch-target focus-visible-ring mobile-full mobile-center"
              >
                Home
              </Link>
              <Link 
                to="/problems" 
                className="btn-primary text-sm px-4 py-2 touch-target focus-visible-ring mobile-full mobile-center"
              >
                Problems
              </Link>
              <Link 
                to="/certificates" 
                className="btn-secondary text-sm px-4 py-2 touch-target focus-visible-ring mobile-full mobile-center"
              >
                Certificates
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* AWS Brand Collaboration */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 border-y border-gray-200">
        <div className="container-wide py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <p className="text-lg sm:text-xl font-semibold text-gray-700">
              In Association with
            </p>
            <div className="bg-white rounded-lg px-8 py-4 shadow-sm border border-gray-200">
              <img 
                src="/aws-logo.png" 
                alt="Amazon Web Services" 
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-wide">
          {/* Note to Participants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="card-premium status-info interactive-card">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Note to Participants</h2>
                  <p className="text-subtle">Important information for all hackathon participants</p>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="gradient-subtle rounded-xl p-6">
                  <p className="text-lead mb-6">
                    You are welcome to <strong>build your own project idea</strong> instead of choosing from the problem statements listed below.
                  </p>
                  
                  <div className="status-warning rounded-lg p-4 mb-6">
                    <p className="text-lg font-semibold mb-4 text-amber-800">
                      However, your solution <strong>must include both of the following components</strong>:
                    </p>
                  </div>
                
                  <div className="grid md:grid-cols-2 gap-6 grid-responsive">
                    <div className="card-elevated interactive-card mobile-friendly">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">1</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 text-balance">AI / Machine Learning</h3>
                      </div>
                      <p className="text-subtle text-balance">
                        For prediction, classification, OCR, recommendation, pattern analysis, anomaly detection, etc.
                      </p>
                    </div>
                    
                    <div className="card-elevated interactive-card mobile-friendly">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">2</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 text-balance">Ethereum Blockchain</h3>
                      </div>
                      <p className="text-subtle text-balance">
                        For smart contracts, verification, escrow, identity, supply chain tracking, or immutable logging
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="card rounded-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <Award className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">Projects will be judged on:</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 gradient-primary rounded-full"></div>
                      <span className="text-gray-700">Strong <strong>AI model integration</strong></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 gradient-primary rounded-full"></div>
                      <span className="text-gray-700"><strong>Secure and gas-efficient</strong> smart contracts</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 gradient-primary rounded-full"></div>
                      <span className="text-gray-700"><strong>Practical real-world usability</strong></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 gradient-primary rounded-full"></div>
                      <span className="text-gray-700">Clean UI/UX and end-to-end workflow</span>
                    </div>
                  </div>
                </div>
                
                <div className="status-warning rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Download className="h-6 w-6 text-amber-600" />
                    <h4 className="text-lg font-bold text-amber-900">Certificate Form</h4>
                  </div>
                  <p className="text-amber-800 mb-4">
                    All participants <strong>must submit their project details through the certificate form</strong> to receive participation or winner certificates.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-amber-700">
                    <ExternalLink className="h-4 w-4" />
                    <a 
                      href="https://docs.google.com/forms/d/e/1FAIpQLSdckcyIjLFX1jTlbFifaKRO6iKkbhZdfHvHhYt_fAMHnuSCVA/viewform?usp=sharing&ouid=105306784253291428501"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-900 underline font-semibold"
                    >
                      Submit the form here
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Problem Statements Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <div className="container-prose">
              <h2 className="gradient-text mb-6">
                Problem Statements
              </h2>
              <p className="text-lead">
                Choose from these exciting challenges that combine AI/ML with blockchain technology to solve real-world problems
              </p>
            </div>
          </motion.div>

          {/* Problem Statement Cards */}
          <div className="space-y-12">
            {/* Problem Statement 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card-premium interactive-card"
            >
              <div className="flex items-start justify-between gap-4 mb-8">
                <div className="flex items-center gap-6">
                  <div className="status-info px-6 py-3 rounded-full font-bold text-sm shrink-0">
                    Problem 01
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Decentralized Academic Credential Verification with AI Authenticity Scoring
                    </h3>
                    <p className="text-subtle">Academic fraud prevention through blockchain and AI</p>
                  </div>
                </div>
                <button 
                  className="text-gray-400 hover:text-yellow-500 p-2 touch-target focus-visible-ring transition-colors"
                  title="Bookmark this problem"
                >
                  ⭐
                </button>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Context</h4>
                <p className="text-gray-700">
                  Academic fraud is growing. Students present fake certificates during admissions, job applications, or scholarship verifications. Traditional verification is slow, manual, and prone to errors.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Challenge</h4>
                <p className="text-gray-700 mb-4">
                  Develop a <strong>Full-Stack decentralized credential verification platform</strong> where:
                </p>
                <ul className="space-y-2 text-gray-700 ml-4">
                  <li>• Institutions upload or issue student certificates</li>
                  <li>• Certificates are <strong>hashed and stored on Ethereum</strong> to ensure immutability</li>
                  <li>• Recruiters / Universities can scan and verify authenticity instantly</li>
                  <li>• <strong>AI/ML model</strong> evaluates the formatting, stamps, and content to detect <em>possible forgery</em> or anomalies</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">User Roles</h5>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Institution (Upload Issue Certificates)</li>
                    <li>• Student (View / Share Certificates)</li>
                    <li>• Verifier (Check Certificate Validity)</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">AI Component</h5>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• OCR to extract text from uploaded certificate PDFs</li>
                    <li>• ML Model to score:</li>
                    <li className="ml-4">- Layout similarity</li>
                    <li className="ml-4">- Seal / logo match</li>
                    <li className="ml-4">- Signature authenticity likelihood</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Ethereum Component</h5>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Store certificate hash on Ethereum (not full file)</li>
                    <li>• Public verification contract interface</li>
                    <li>• Proof-of-Integrity check</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-gray-900 mb-3">Frontend / Backend</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Certificate viewer dashboard</li>
                  <li>• Verification QR link sharable on resume / LinkedIn</li>
                  <li>• REST or GraphQL backend for role flows</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-2">Deliverable Impact</h5>
                <p className="text-green-700">
                  Eliminates certificate forgery • Enables easy and transparent verification globally
                </p>
              </div>
            </motion.div>

            {/* Problem Statement 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
                  Problem 2
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex-1">
                  Smart Micro-Lending System with AI Risk Rating and Ethereum Escrow
                </h3>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Context</h4>
                <p className="text-gray-700">
                  Millions of small borrowers lack formal credit scores. Lenders face trust issues. Banks reject them.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Challenge</h4>
                <p className="text-gray-700 mb-4">
                  Build a <strong>Peer-to-Peer Micro-Lending Web Platform</strong> where:
                </p>
                <ul className="space-y-2 text-gray-700 ml-4">
                  <li>• Borrowers request small loans</li>
                  <li>• Lenders fund them</li>
                  <li>• AI predicts borrower repayment probability based on profile & transaction history</li>
                  <li>• Ethereum Smart Contracts handle <strong>escrow, interest, lock-in and penalties</strong></li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">AI Component</h5>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Train/Use ML model to classify borrower as Low/Medium/High risk</li>
                    <li>• Explainable output (why the model gave that score)</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Ethereum Component</h5>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Loan escrow smart contract</li>
                    <li>• Auto interest calculation and lock-in rules</li>
                    <li>• On-time repayment incentives and delayed repayment penalties</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Core System</h5>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Borrower/Lender dashboards</li>
                    <li>• Transaction summary</li>
                    <li>• Repayment timeline tracking</li>
                    <li>• Transparent risk score visibility</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-2">Deliverable Impact</h5>
                <p className="text-green-700">
                  Creates trust without intermediaries • Gives financial access to unbanked individuals
                </p>
              </div>
            </motion.div>

            {/* Problem Statement 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold">
                  Problem 3
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex-1">
                  Decentralized Freelance Work Marketplace with AI Skill & Price Match
                </h3>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Context</h4>
                <p className="text-gray-700">
                  Freelancing platforms take high commission and matching between clients and freelancers is inefficient.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Challenge</h4>
                <p className="text-gray-700 mb-4">
                  Create a <strong>Web3-based Freelance Marketplace</strong> where:
                </p>
                <ul className="space-y-2 text-gray-700 ml-4">
                  <li>• Freelancers list skills & previous work</li>
                  <li>• Clients post job requirements</li>
                  <li>• AI matches freelancer suitability based on skills, complexity & price fit</li>
                  <li>• Ethereum Contracts manage escrow payments & dispute resolution</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">AI Component</h5>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• NLP-based similarity scoring between:</li>
                    <li className="ml-4">- Job requirements</li>
                    <li className="ml-4">- Freelancer portfolios & skill tags</li>
                    <li>• Recommendation engine ranking top freelancers</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Ethereum Component</h5>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Escrow contract for work milestones</li>
                    <li>• Automatic payment release on approval</li>
                    <li>• Rating stored immutably to prevent manipulation</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Full-Stack System</h5>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Client & Freelancer dashboards</li>
                    <li>• Real-time chat / communication interface</li>
                    <li>• Proposal / Offer workflow</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-2">Deliverable Impact</h5>
                <p className="text-green-700">
                  Fair, transparent, commission-free freelancing ecosystem
                </p>
              </div>
            </motion.div>

            {/* Problem Statement 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                  Problem 4
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex-1">
                  Medical Prescription Reader with Blockchain-based Drug Authenticity Tracking
                </h3>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Context</h4>
                <p className="text-gray-700">
                  Fake drugs enter supply chains and handwritten prescriptions often cause incorrect medicine dispensing.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Challenge</h4>
                <p className="text-gray-700 mb-4">
                  Build a <strong>Pharmacy Management System</strong> that:
                </p>
                <ul className="space-y-2 text-gray-700 ml-4">
                  <li>• Uses <strong>AI OCR</strong> to read handwritten prescriptions</li>
                  <li>• Suggests medicines from database with dosage & brand alternatives</li>
                  <li>• Tracks medicine batch & source using <strong>Ethereum smart contracts</strong></li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">AI Component</h5>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• OCR + NLP to parse doctor's handwriting</li>
                    <li>• Identify medicine name and dosage fields automatically</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Ethereum Component</h5>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Record each medicine batch supply chain lifecycle</li>
                    <li>• Verify drug authenticity & origin before dispensing</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Application</h5>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Pharmacy dashboard</li>
                    <li>• Prescription upload & verification UI</li>
                    <li>• Alerts if drug is counterfeit or expired batch is detected</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-2">Deliverable Impact</h5>
                <p className="text-green-700">
                  Reduces misdiagnosis and counterfeit drug circulation
                </p>
              </div>
            </motion.div>

            {/* Problem Statement 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full font-semibold">
                  Problem 5
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex-1">
                  Smart Solid Waste Management & Payment Transparency System
                </h3>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Context</h4>
                <p className="text-gray-700">
                  Cities face waste overflow due to irregular collection and accountability gaps.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Challenge</h4>
                <p className="text-gray-700 mb-4">
                  Create a <strong>Smart Waste Collection Dashboard</strong> where:
                </p>
                <ul className="space-y-2 text-gray-700 ml-4">
                  <li>• Citizens upload bin images</li>
                  <li>• AI detects bin fill-level</li>
                  <li>• Collection requests get automatically scheduled</li>
                  <li>• Completion logs stored on Ethereum for transparency</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">AI Component</h5>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Image classification to determine waste overflow level</li>
                    <li>• Predictive analysis for collection scheduling</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Ethereum Component</h5>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Immutable record of completed pickups, timestamps, staff IDs</li>
                    <li>• Prevents corruption and fake reporting</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-3">Application</h5>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Citizen request portal</li>
                    <li>• Municipal officer dashboard</li>
                    <li>• Live completion tracking map</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-2">Deliverable Impact</h5>
                <p className="text-green-700">
                  Efficient waste management + corruption-free reporting
                </p>
              </div>
            </motion.div>
          </div>

          {/* Prize Information */}
          <motion.div
            className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 sm:p-8 border border-yellow-200 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Prize Bounty Announcement</h3>
            
            <div className="bg-white rounded-lg p-6 border border-yellow-200 mb-6">
              <div className="text-center mb-4">
                <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">$100</div>
                <div className="text-xl font-semibold text-gray-700">Best Ethereum Smart Contract Implementation</div>
              </div>
              <p className="text-gray-600 text-center">
                The team demonstrating the most efficient, secure & well-integrated Ethereum Smart Contract implementation will receive a $100 Prize.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-yellow-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Scoring Focus:</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Gas-efficiency</strong></li>
                  <li>• <strong>Contract security</strong></li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Front-end + blockchain interaction clarity</strong></li>
                  <li>• <strong>Real-world usability</strong></li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Certificate Information */}
          <motion.div
            className="bg-gray-50 rounded-xl p-6 sm:p-8 border border-gray-200 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 text-center">Participation Certificates</h3>
            <p className="text-base sm:text-lg text-gray-700 mb-3 text-center">
              🏆 All participants will receive certificates of participation
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-center">
              Showcase your involvement in this cutting-edge hackathon on your portfolio and LinkedIn
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12 sm:mt-16 md:mt-20">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/logo.png" 
                  alt="AIML Club Logo" 
                  className="w-10 h-10 object-contain rounded-md"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">AIML Club</h3>
                  <p className="text-sm text-gray-600">Hack with Stack 2025</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Building the future with AI, ML, and blockchain technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <nav className="space-y-2">
                <Link to="/" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
                <Link to="/problems" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Problem Statements
                </Link>
                <a href="#prizes" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Prizes & Rewards
                </a>
              </nav>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Discord Community
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  GitHub Repository
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
              © 2025 AIML Club. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-40 focus-visible-ring touch-target"
          title="Back to top"
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}
    </div>
  );
};

export default Problems;
