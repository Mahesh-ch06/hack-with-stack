import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";

interface Certificate {
  name: string;
  email: string;
  teamName: string;
  certificateType: "participation" | "winner" | "runner-up";
  certificateId: string;
  projectTitle: string;
  downloadUrl: string;
}

const CertificateViewer = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCertificate = async () => {
      try {
        const response = await fetch('/certificates-data.json');
        const data: Certificate[] = await response.json();
        const found = data.find(cert => cert.certificateId === certificateId);
        
        if (found) {
          setCertificate(found);
          // Update page title
          document.title = `Certificate - ${found.name} | AIML Club`;
        } else {
          navigate('/certificates');
        }
      } catch (error) {
        navigate('/certificates');
      } finally {
        setLoading(false);
      }
    };

    loadCertificate();
  }, [certificateId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading certificate...</p>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-7xl">
          <button
            onClick={() => navigate('/certificates')}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Certificates</span>
          </button>
          
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="AIML Club" 
              className="w-8 h-8 object-contain rounded"
            />
            <span className="text-lg font-bold text-gray-900">AIML Club</span>
          </div>
        </div>
      </header>

      {/* Certificate Info Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-xl sm:text-2xl font-bold mb-1">{certificate.name}</h1>
          <p className="text-blue-100 text-sm sm:text-base">
            Certificate ID: {certificate.certificateId} • Team: {certificate.teamName}
          </p>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="aspect-[1.414/1] bg-gray-100">
            <object
              data={certificate.downloadUrl}
              type="application/pdf"
              className="w-full h-full"
            >
              <iframe
                src={`${certificate.downloadUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                className="w-full h-full"
                title="Certificate"
              >
                <div className="flex items-center justify-center h-full p-8">
                  <div className="text-center">
                    <p className="text-gray-700 font-semibold mb-4">
                      Unable to display PDF in browser
                    </p>
                    <a
                      href={certificate.downloadUrl}
                      download
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      Download Certificate
                    </a>
                  </div>
                </div>
              </iframe>
            </object>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
          <a
            href={certificate.downloadUrl}
            download={`${certificate.name.replace(/\s+/g, '-')}-Certificate.pdf`}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors shadow-md"
          >
            <Download className="w-5 h-5" />
            Download Certificate
          </a>
          <a
            href={certificate.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-md"
          >
            <ExternalLink className="w-5 h-5" />
            Open in New Tab
          </a>
        </div>

        {/* Certificate Details */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Certificate Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 mb-1">Recipient Name</p>
              <p className="font-semibold text-gray-900">{certificate.name}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Certificate ID</p>
              <p className="font-mono font-semibold text-gray-900">{certificate.certificateId}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Team Name</p>
              <p className="font-semibold text-gray-900">{certificate.teamName}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Project Title</p>
              <p className="font-semibold text-gray-900">{certificate.projectTitle}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Certificate Type</p>
              <p className="font-semibold text-gray-900 capitalize">{certificate.certificateType}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Event</p>
              <p className="font-semibold text-gray-900">Hack with Stack 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateViewer;
