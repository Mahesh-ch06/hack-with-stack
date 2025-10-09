import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Problems = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center p-1">
                <img 
                  src="/logo.png" 
                  alt="SRU AIML Club Logo" 
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Hack with Stack</h1>
                <p className="text-sm text-gray-600">AIML Club Problem Statements</p>
              </div>
            </motion.div>
            
            <nav className="flex items-center gap-2">
              <a href="/" className="px-4 py-2 rounded-md text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all">
                Home
              </a>
              <a href="/problems" className="px-4 py-2 rounded-md text-sm bg-gray-900 text-white">
                Problem Statements
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-600"></span>
              </span>
              <span className="text-sm font-medium text-gray-900">Coming Soon</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900">
              Problem Statements Releasing Soon
            </h2>
            <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-12">
              Stay Tuned...
            </p>

            {/* Prize Information */}
            <motion.div
              className="bg-gray-50 rounded-lg p-8 mb-12 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Prizes & Rewards</h3>
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="text-4xl font-bold text-gray-900 mb-2">$100</div>
                  <div className="text-lg font-medium text-gray-700">Best Hack Built on Ethereum</div>
                  <p className="text-gray-600 mt-2">Win the top prize for the most innovative solution built on the Ethereum blockchain</p>
                </div>
              </div>
            </motion.div>

            {/* Certificate Information */}
            <motion.div
              className="bg-gray-50 rounded-lg p-8 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Participation Certificates</h3>
              <p className="text-lg text-gray-700">
                🏆 All participants will receive certificates of participation
              </p>
              <p className="text-gray-600 mt-2">
                Showcase your involvement in this cutting-edge hackathon on your portfolio and LinkedIn
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              © 2025 AIML Club. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                About
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Problems;
