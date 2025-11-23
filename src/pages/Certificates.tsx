import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, Search, Download, Award, CheckCircle, X, Eye, ExternalLink, Home, FileText, GraduationCap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FloatingHeader } from "@/components/ui/floating-header";

interface Certificate {
  name: string;
  email: string;
  teamName: string;
  certificateType: "participation" | "winner" | "runner-up";
  certificateId: string;
  projectTitle: string;
  downloadUrl: string;
}

// Sample certificate data (replace with actual data from your backend/database)
// For Google Sheets integration, see CERTIFICATE_SETUP_GUIDE.md

// To use Google Sheets as database:
// 1. Create a Google Sheet with columns: Name, Email, TeamName, CertificateType, CertificateID, ProjectTitle, DownloadURL
// 2. Publish it as CSV (File → Share → Publish to web → CSV)
// 3. Replace the URL below with your published CSV URL
// 4. Uncomment the useEffect below to fetch from Google Sheets

const GOOGLE_SHEET_CSV_URL = ""; // Add your Google Sheet CSV URL here

const certificatesDatabase: Certificate[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    teamName: "Tech Innovators",
    certificateType: "winner",
    certificateId: "HWS2025-WIN-001",
    projectTitle: "AI-Powered Academic Verification",
    downloadUrl: "#"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    teamName: "Code Warriors",
    certificateType: "participation",
    certificateId: "HWS2025-PAR-002",
    projectTitle: "Smart Waste Management System",
    downloadUrl: "#"
  },
  // Add more certificates as needed
];

const Certificates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Certificate[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [previewCertificate, setPreviewCertificate] = useState<Certificate | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifyId, setVerifyId] = useState("");
  const [verifyResult, setVerifyResult] = useState<Certificate | null>(null);
  const [verifyError, setVerifyError] = useState(false);
  const [suggestions, setSuggestions] = useState<Certificate[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to minimize header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Load certificates from JSON file
  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const response = await fetch('/certificates-data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCertificates(data);
      } catch (error) {
        // Fallback to sample data if file not found
        setCertificates(certificatesDatabase);
      } finally {
        setLoading(false);
      }
    };

    loadCertificates();
  }, []);

  // Uncomment this to fetch from Google Sheets
  /*
  useEffect(() => {
    const fetchCertificatesFromGoogleSheets = async () => {
      if (!GOOGLE_SHEET_CSV_URL) return;
      
      setLoading(true);
      try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        const text = await response.text();
        
        // Parse CSV (skip header row)
        const rows = text.split('\n').slice(1);
        const parsedCertificates = rows
          .map(row => {
            const columns = row.split(',').map(col => col.trim().replace(/^"|"$/g, ''));
            if (columns.length < 7) return null;
            
            return {
              name: columns[0],
              email: columns[1],
              teamName: columns[2],
              certificateType: columns[3] as "participation" | "winner" | "runner-up",
              certificateId: columns[4],
              projectTitle: columns[5],
              downloadUrl: columns[6]
            };
          })
          .filter((cert): cert is Certificate => cert !== null && cert.name !== '');
        
        setCertificates(parsedCertificates);
      } catch (error) {
        // Silent error handling
      } finally {
        setLoading(false);
      }
    };

    fetchCertificatesFromGoogleSheets();
  }, []);
  */

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setHasSearched(false);
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }
    
    const query = searchQuery.toLowerCase().trim();
    const results = certificates.filter(cert => 
      cert.name.toLowerCase().includes(query) ||
      cert.email.toLowerCase().includes(query) ||
      cert.teamName.toLowerCase().includes(query) ||
      cert.certificateId.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
    setHasSearched(true);
    setShowSuggestions(false);
    
    // Scroll to results after a short delay
    setTimeout(() => {
      const resultsElement = document.getElementById('search-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    
    if (value.trim().length > 0) {
      const query = value.toLowerCase().trim();
      const filtered = certificates.filter(cert => 
        cert.name.toLowerCase().includes(query) ||
        cert.email.toLowerCase().includes(query) ||
        cert.teamName.toLowerCase().includes(query) ||
        cert.certificateId.toLowerCase().includes(query)
      ).slice(0, 5); // Show top 5 suggestions
      
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (cert: Certificate) => {
    setSearchQuery(cert.name);
    setSearchResults([cert]);
    setHasSearched(true);
    setShowSuggestions(false);
    
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('search-results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handlePreview = (cert: Certificate) => {
    setPreviewCertificate(cert);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleVerify = () => {
    if (!verifyId.trim()) return;
    
    const found = certificates.find(cert => 
      cert.certificateId.toLowerCase() === verifyId.toLowerCase().trim()
    );
    
    if (found) {
      setVerifyResult(found);
      setVerifyError(false);
    } else {
      setVerifyResult(null);
      setVerifyError(true);
    }
  };

  const handleVerifyKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  const getCertificateColor = (type: string) => {
    switch (type) {
      case "winner":
        return "from-yellow-400 to-amber-500";
      case "runner-up":
        return "from-gray-300 to-gray-400";
      case "participation":
        return "from-blue-400 to-cyan-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  const getCertificateBadge = (type: string) => {
    switch (type) {
      case "winner":
        return "🏆 Winner";
      case "runner-up":
        return "🥈 Runner Up";
      case "participation":
        return "⭐ Participation";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Header */}
      <FloatingHeader />

      {/* Main Content */}
      <section className="section-padding px-4 pt-8">
        <div className="container-wide max-w-4xl">
          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-4 sm:mb-6 shadow-lg">
              <Award className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">Find Your Certificate</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
              Enter your name, email, team name, or certificate ID to search
            </p>

            {/* Search Bar */}
            <div className="card-elevated max-w-2xl mx-auto">
              {loading && (
                <div className="text-center py-4 text-gray-600">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-sm">Loading certificates...</p>
                </div>
              )}
              {!loading && (
                <div className="relative" ref={searchRef}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 z-10" />
                      <input
                        type="text"
                        placeholder="Search by name, email, or ID..."
                        value={searchQuery}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onFocus={() => {
                          if (suggestions.length > 0) setShowSuggestions(true);
                        }}
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors touch-target"
                      />
                      
                      {/* Suggestions Dropdown */}
                      {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-blue-300 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                          {suggestions.map((cert, index) => (
                            <button
                              key={cert.certificateId}
                              onClick={() => handleSuggestionClick(cert)}
                              className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getCertificateColor(cert.certificateType)} flex items-center justify-center flex-shrink-0`}>
                                  <Award className="h-4 w-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-gray-900 text-sm truncate">{cert.name}</p>
                                  <p className="text-xs text-gray-600 truncate">{cert.teamName}</p>
                                </div>
                                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-medium flex-shrink-0">
                                  {cert.certificateType}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleSearch}
                      disabled={certificates.length === 0}
                      className="btn-primary px-6 sm:px-8 py-3 sm:py-4 whitespace-nowrap touch-target text-sm sm:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Search
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Certificate Verification Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <div className="card-elevated max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Verify Certificate</h3>
                  <p className="text-sm text-gray-600">Enter certificate ID to verify authenticity</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter Certificate ID (e.g., HWS2025-PAR-000)"
                    value={verifyId}
                    onChange={(e) => {
                      setVerifyId(e.target.value);
                      setVerifyError(false);
                      setVerifyResult(null);
                    }}
                    onKeyPress={handleVerifyKeyPress}
                    className="w-full px-4 py-3 text-base border-2 border-green-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors font-mono"
                  />
                </div>
                <button
                  onClick={handleVerify}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  Verify
                </button>
              </div>

              {/* Verification Result */}
              {verifyResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-4 border-2 border-green-300"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-bold text-green-900 text-lg mb-1">✓ Certificate Verified</p>
                      <p className="text-sm text-green-700 mb-3">This is an authentic certificate issued by AIML Club</p>
                      
                      <div className="bg-green-50 rounded-lg p-3 space-y-2 text-xs sm:text-sm">
                        <p className="break-words"><strong className="text-gray-700">Recipient:</strong> <span className="text-gray-900 font-semibold">{verifyResult.name}</span></p>
                        <p className="break-words"><strong className="text-gray-700">Team:</strong> <span className="text-gray-900">{verifyResult.teamName}</span></p>
                        <p className="break-words"><strong className="text-gray-700">Type:</strong> <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 ml-1">{getCertificateBadge(verifyResult.certificateType)}</span></p>
                        <p className="break-all"><strong className="text-gray-700">Certificate ID:</strong> <span className="font-mono text-green-600 text-xs">{verifyResult.certificateId}</span></p>
                        <p className="break-all"><strong className="text-gray-700">Email:</strong> <span className="text-gray-900">{verifyResult.email}</span></p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 mt-3">
                        <button
                          onClick={() => handlePreview(verifyResult)}
                          className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 touch-target"
                        >
                          <Eye className="h-4 w-4" />
                          Preview
                        </button>
                        <a
                          href={verifyResult.downloadUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-green-600 text-white px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 touch-target"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Verification Error */}
              {verifyError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-2 border-red-200 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <X className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-red-900 mb-1">Certificate Not Found</p>
                      <p className="text-sm text-red-700">
                        No certificate found with ID: <span className="font-mono font-semibold">{verifyId}</span>
                      </p>
                      <p className="text-xs text-red-600 mt-2">
                        Please check the ID and try again, or contact support if you believe this is an error.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Search Results */}
          {hasSearched && (
            <motion.div
              id="search-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {searchResults.length === 0 ? (
                <div className="card-elevated text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certificates Found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any certificates matching your search criteria.
                  </p>
                  <p className="text-sm text-gray-500">
                    Make sure you've submitted your details through the{" "}
                    <a 
                      href="https://docs.google.com/forms/d/e/1FAIpQLSdckcyIjLFX1jTlbFifaKRO6iKkbhZdfHvHhYt_fAMHnuSCVA/viewform?usp=sharing&ouid=105306784253291428501"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 underline font-semibold"
                    >
                      certificate form
                    </a>
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Found {searchResults.length} Certificate{searchResults.length !== 1 ? 's' : ''}
                    </h3>
                  </div>

                  {searchResults.map((certificate, index) => (
                    <motion.div
                      key={certificate.certificateId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="card-elevated interactive-card hover:shadow-xl"
                    >
                      <div className="flex flex-col gap-4">
                        {/* Certificate Info */}
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${getCertificateColor(certificate.certificateType)} flex items-center justify-center shadow-md flex-shrink-0`}>
                              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-lg sm:text-xl font-bold text-gray-900 break-words">{certificate.name}</h4>
                              <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 mt-1">
                                {getCertificateBadge(certificate.certificateType)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                            <p className="break-words"><strong>Team:</strong> {certificate.teamName}</p>
                            <p className="break-words"><strong>Project:</strong> {certificate.projectTitle}</p>
                            <p className="break-all"><strong>Certificate ID:</strong> <span className="font-mono text-blue-600 text-xs">{certificate.certificateId}</span></p>
                            <p className="break-all"><strong>Email:</strong> {certificate.email}</p>
                          </div>
                        </div>

                        {/* Download Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <button
                            onClick={() => handlePreview(certificate)}
                            className="btn-primary flex items-center gap-2 justify-center whitespace-nowrap touch-target flex-1 text-sm"
                          >
                            <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="hidden sm:inline">Preview Certificate</span>
                            <span className="sm:hidden">Preview</span>
                          </button>
                          <a
                            href={certificate.downloadUrl}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary flex items-center gap-2 justify-center whitespace-nowrap touch-target flex-1 text-sm"
                          >
                            <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                            Download
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Instructions */}
          {!hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card mt-8 md:mt-12"
            >
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">How to Get Your Certificate</h3>
              <div className="space-y-3 sm:space-y-4 text-gray-700">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                    <span className="text-blue-600 font-bold text-sm sm:text-base">1</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold mb-1 text-sm sm:text-base">Submit Your Details</p>
                    <p className="text-xs sm:text-sm text-gray-600 break-words">
                      Make sure you've submitted your project details through the{" "}
                      <a 
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdckcyIjLFX1jTlbFifaKRO6iKkbhZdfHvHhYt_fAMHnuSCVA/viewform?usp=sharing&ouid=105306784253291428501"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline font-semibold"
                      >
                        certificate form
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Wait for Processing</p>
                    <p className="text-sm text-gray-600">
                      Certificates are generated within 48 hours after the hackathon concludes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Search and Download</p>
                    <p className="text-sm text-gray-600">
                      Use the search bar above to find and download your certificate
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Certificate Preview Modal */}
      {previewCertificate && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewCertificate(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div className="text-white min-w-0 flex-1">
                  <h3 className="font-bold text-sm sm:text-base md:text-lg truncate">Certificate Preview</h3>
                  <p className="text-xs sm:text-sm text-white/80 truncate font-mono">{previewCertificate.certificateId}</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewCertificate(null)}
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-colors flex-shrink-0 touch-target"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </button>
            </div>

            {/* Certificate Preview */}
            <div className="p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Certificate Info Card */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-blue-200">
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Recipient</p>
                    <p className="text-base sm:text-lg font-bold text-gray-900 break-words">{previewCertificate.name}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Certificate Type</p>
                    <p className="text-base sm:text-lg font-semibold">
                      <span className="inline-flex items-center px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800">
                        {getCertificateBadge(previewCertificate.certificateType)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Team Name</p>
                    <p className="text-sm sm:text-base font-medium text-gray-800 break-words">{previewCertificate.teamName}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Email</p>
                    <p className="text-sm sm:text-base font-medium text-gray-800 break-all">{previewCertificate.email}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Project Title</p>
                    <p className="text-sm sm:text-base font-medium text-gray-800 break-words">{previewCertificate.projectTitle}</p>
                  </div>
                </div>
              </div>

              {/* Certificate Image/PDF Preview */}
              <div className="bg-gray-100 rounded-xl p-3 sm:p-6 md:p-8 mb-4 sm:mb-6 border-2 border-gray-200">
                {previewCertificate.downloadUrl && previewCertificate.downloadUrl !== "#" ? (
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {previewCertificate.downloadUrl.includes('drive.google.com') ? (
                      // Google Drive Preview
                      <iframe
                        src={previewCertificate.downloadUrl.replace('/view', '/preview')}
                        className="w-full h-[500px] sm:h-[600px]"
                        title="Certificate Preview"
                      />
                    ) : previewCertificate.downloadUrl.endsWith('.pdf') ? (
                      // PDF Preview - Simple embed with fallback
                      <div className="relative w-full h-[500px] sm:h-[600px] bg-gray-50 flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full p-6 mx-auto mb-6 w-24 h-24 flex items-center justify-center">
                            <Award className="h-12 w-12 text-white" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                            Certificate Ready!
                          </h3>
                          <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Your certificate is ready to download. Click the button below to view or save it.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                              href={previewCertificate.downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors"
                            >
                              <Eye className="h-5 w-5" />
                              View Certificate
                            </a>
                            <a
                              href={previewCertificate.downloadUrl}
                              download={`${previewCertificate.name.replace(/\s+/g, '-')}-Certificate.pdf`}
                              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                            >
                              <Download className="h-5 w-5" />
                              Download PDF
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Image Preview
                      <img
                        src={previewCertificate.downloadUrl}
                        alt="Certificate"
                        className="w-full h-auto object-contain max-h-[600px]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                ) : (
                  // Placeholder when no certificate URL
                  <div className="aspect-[1.414/1] bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Award className="h-24 w-24 text-blue-400 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">Certificate Preview Not Available</p>
                      <p className="text-sm text-gray-500 mt-2">The certificate will be available for download soon</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Verification Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-green-900 text-sm sm:text-base">Verified Certificate</p>
                    <p className="text-xs sm:text-sm text-green-700 mt-1 break-words">
                      This certificate is officially issued by AIML Club for Hack with Stack 2025
                    </p>
                    <p className="text-xs text-green-600 mt-2 font-mono break-all">
                      ID: {previewCertificate.certificateId}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-gray-50 flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => setPreviewCertificate(null)}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 text-gray-700 text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors touch-target"
              >
                Close
              </button>
              <a
                href={previewCertificate.downloadUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm sm:text-base font-semibold hover:from-blue-700 hover:to-cyan-700 transition-colors flex items-center justify-center gap-2 touch-target"
              >
                <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                Download
              </a>
              <a
                href={previewCertificate.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border-2 border-blue-600 text-blue-600 text-sm sm:text-base font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 touch-target"
              >
                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Open in New Tab</span>
                <span className="sm:hidden">Open</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}

      {/* Download Modal (Legacy - kept for compatibility) */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Certificate Ready!</h3>
              <p className="text-gray-600">
                Your certificate is ready to download
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 mb-1"><strong>Name:</strong> {selectedCertificate.name}</p>
              <p className="text-sm text-gray-700 mb-1"><strong>Type:</strong> {getCertificateBadge(selectedCertificate.certificateType)}</p>
              <p className="text-sm text-gray-700"><strong>ID:</strong> <span className="font-mono">{selectedCertificate.certificateId}</span></p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedCertificate(null)}
                className="btn-secondary flex-1 py-3"
              >
                Close
              </button>
              <a
                href={selectedCertificate.downloadUrl}
                download
                className="btn-primary flex-1 py-3 flex items-center justify-center gap-2"
              >
                <Download className="h-5 w-5" />
                Download
              </a>
            </div>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © 2025 AIML Club - Hack with Stack. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              For any issues, contact support at{" "}
              <a href="mailto:chitikeshimahesh6@gmail.com" className="text-blue-600 hover:text-blue-700">
                chitikeshimahesh6@gmail.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Certificates;
