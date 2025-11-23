import { useState } from "react";
import { Link } from "react-router-dom";
import { Upload, Download, FileSpreadsheet, CheckCircle, AlertCircle } from "lucide-react";
import * as XLSX from 'xlsx';

interface CertificateUpload {
  name: string;
  email: string;
  teamName: string;
  certificateType: string;
  certificateId: string;
  projectTitle: string;
  downloadUrl: string;
}

const AdminPanel = () => {
  const [uploadedData, setUploadedData] = useState<CertificateUpload[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as CertificateUpload[];

        setUploadedData(jsonData);
        setMessage({ type: 'success', text: `Successfully loaded ${jsonData.length} certificates` });
      } catch (error) {
        setMessage({ type: 'error', text: 'Error reading file. Please check the format.' });
        console.error(error);
      }
    };
    reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {
    const template = [
      {
        name: "John Doe",
        email: "john@example.com",
        teamName: "Team Alpha",
        certificateType: "participation",
        certificateId: "HWS2025-PAR-001",
        projectTitle: "AI Project",
        downloadUrl: "https://drive.google.com/file/d/YOUR_FILE_ID/view"
      }
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Certificates");
    XLSX.writeFile(wb, "certificate_template.xlsx");
  };

  const exportJSON = () => {
    const jsonString = JSON.stringify(uploadedData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'certificates_data.json';
    a.click();
  };

  const copyToClipboard = () => {
    const jsonString = JSON.stringify(uploadedData, null, 2);
    navigator.clipboard.writeText(jsonString);
    setMessage({ type: 'success', text: 'Copied to clipboard! Paste this into Certificates.tsx' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-sm text-gray-600">Certificate Management System</p>
            </div>
            <Link 
              to="/certificates" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Certificates Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📋 How to Upload Certificates</h2>
          <div className="space-y-3 text-gray-700">
            <p className="flex items-start gap-2">
              <span className="font-semibold text-blue-600">1.</span>
              Download the Excel template below
            </p>
            <p className="flex items-start gap-2">
              <span className="font-semibold text-blue-600">2.</span>
              Fill in participant details (Name, Email, Team Name, Certificate Type, Certificate ID, Project Title)
            </p>
            <p className="flex items-start gap-2">
              <span className="font-semibold text-blue-600">3.</span>
              Upload certificates to Google Drive and get shareable links
            </p>
            <p className="flex items-start gap-2">
              <span className="font-semibold text-blue-600">4.</span>
              Paste Google Drive links in the "downloadUrl" column
            </p>
            <p className="flex items-start gap-2">
              <span className="font-semibold text-blue-600">5.</span>
              Upload the Excel file here and export as JSON
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Download Template */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Download Template</h3>
                <p className="text-sm text-gray-600">Get the Excel template</p>
              </div>
            </div>
            <button
              onClick={downloadTemplate}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <FileSpreadsheet className="inline-block h-5 w-5 mr-2" />
              Download Excel Template
            </button>
          </div>

          {/* Upload File */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Upload Certificate Data</h3>
                <p className="text-sm text-gray-600">Import from Excel/CSV</p>
              </div>
            </div>
            <label className="w-full block">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center cursor-pointer">
                <Upload className="inline-block h-5 w-5 mr-2" />
                Upload Excel/CSV File
              </div>
            </label>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`rounded-lg p-4 mb-6 flex items-center gap-3 ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Uploaded Data Preview */}
        {uploadedData.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Uploaded Data ({uploadedData.length} certificates)
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  📋 Copy JSON
                </button>
                <button
                  onClick={exportJSON}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  💾 Export JSON
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700 border-b">Name</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700 border-b">Email</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700 border-b">Team</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700 border-b">Type</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700 border-b">ID</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedData.slice(0, 10).map((cert, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 border-b">{cert.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 border-b">{cert.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 border-b">{cert.teamName}</td>
                      <td className="px-4 py-3 text-sm border-b">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          cert.certificateType === 'winner' ? 'bg-yellow-100 text-yellow-800' :
                          cert.certificateType === 'runner-up' ? 'bg-gray-100 text-gray-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {cert.certificateType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-600 border-b">{cert.certificateId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {uploadedData.length > 10 && (
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Showing first 10 of {uploadedData.length} certificates
                </p>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Next Steps:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                <li>Click "Copy JSON" or "Export JSON" above</li>
                <li>Open <code className="bg-blue-100 px-2 py-1 rounded">src/pages/Certificates.tsx</code></li>
                <li>Replace the <code className="bg-blue-100 px-2 py-1 rounded">certificatesDatabase</code> array with your data</li>
                <li>Save the file and test the certificate portal</li>
              </ol>
            </div>
          </div>
        )}

        {/* Google Sheets Instructions */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6 mt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 Pro Tip: Use Google Sheets</h3>
          <p className="text-gray-700 mb-4">
            For automatic real-time updates without re-deploying, use Google Sheets as your database:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Create a Google Sheet with your certificate data</li>
            <li>Go to File → Share → Publish to web → Select CSV format</li>
            <li>Copy the published CSV URL</li>
            <li>Update <code className="bg-white px-2 py-1 rounded">GOOGLE_SHEET_CSV_URL</code> in Certificates.tsx</li>
            <li>Uncomment the <code className="bg-white px-2 py-1 rounded">useEffect</code> hook</li>
          </ol>
          <p className="text-sm text-gray-600 mt-4">
            See <code className="bg-white px-2 py-1 rounded">CERTIFICATE_SETUP_GUIDE.md</code> for detailed instructions
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
