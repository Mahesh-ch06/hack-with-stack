"use client"
import { useEffect, useRef, useState } from "react"
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Award, X, Download } from "lucide-react"

export default function ShaderShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [showCertificatePopup, setShowCertificatePopup] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  useEffect(() => {
    // Show certificate popup after 5 seconds
    const timer = setTimeout(() => {
      setShowCertificatePopup(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#06b6d4" />
            <stop offset="70%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#000000", "#06b6d4", "#0891b2", "#164e63", "#f97316"]}
        speed={0.3}
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-60"
        colors={["#000000", "#ffffff", "#06b6d4", "#f97316"]}
        speed={0.2}
      />

      <header className="relative z-20 flex items-center justify-between p-3 sm:p-4 md:p-6 gap-2 sm:gap-3">
        <motion.div
          className="flex items-center group cursor-pointer flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.svg
            fill="currentColor"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="size-6 sm:size-8 md:size-10 text-white group-hover:drop-shadow-lg transition-all duration-300"
            style={{
              filter: "url(#logo-glow)",
            }}
            whileHover={{
              fill: "url(#logo-gradient)",
              rotate: [0, -2, 2, 0],
              transition: {
                fill: { duration: 0.3 },
                rotate: { duration: 0.6, ease: "easeInOut" },
              },
            }}
          >
            <motion.path
              d="M15 85V15h12l18 35 18-35h12v70h-12V35L45 70h-10L17 35v50H15z"
              initial={{ pathLength: 1 }}
              whileHover={{
                pathLength: [1, 0, 1],
                transition: { duration: 1.2, ease: "easeInOut" },
              }}
            />
          </motion.svg>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [-10, -20, -10],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Navigation - Responsive */}
        <nav className="flex items-center gap-1 sm:gap-2 flex-1 justify-center">
          <Link
            to="/problems"
            className="text-white/80 hover:text-white text-xs sm:text-sm font-light px-2 sm:px-3 md:px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200 whitespace-nowrap"
          >
            Problems
          </Link>
          <Link
            to="/certificates"
            className="text-white/80 hover:text-white text-xs sm:text-sm font-light px-2 sm:px-3 md:px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200 whitespace-nowrap"
          >
            Certificates
          </Link>
          <a
            href="https://hack-with-stack.devfolio.co/application"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white text-xs sm:text-sm font-light px-2 sm:px-3 md:px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200 whitespace-nowrap"
          >
            Register
          </a>
        </nav>

        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <img 
            src="/logo.png" 
            alt="AIML Club Logo" 
            className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain rounded-full bg-white/10 p-1.5 sm:p-2 backdrop-blur-sm border border-white/20"
          />
        </div>
      </header>

      <main className="relative z-10 flex items-center min-h-screen pt-24 pb-32 sm:pt-28 sm:pb-36 px-4 sm:px-6 md:px-8">
        <div className="text-center sm:text-left max-w-2xl w-full sm:ml-0">
          <motion.div
            className="inline-flex items-center px-3 sm:px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-white/5 backdrop-blur-sm mb-4 md:mb-6 relative border border-white/10 mx-auto sm:mx-0"
            style={{
              filter: "url(#glass-effect)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent rounded-full" />
            <span className="text-white/90 text-xs sm:text-sm md:text-base font-medium relative z-10 tracking-wide text-center">
              🚀 Join the Ultimate Hackathon Experience
            </span>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 md:mb-6 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              className="block font-light text-white/90 text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-2.5 tracking-wider"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #06b6d4 30%, #f97316 70%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "url(#text-glow)",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              AIML club present's
            </motion.span>
            <span className="block font-black text-white drop-shadow-2xl">Hack with</span>
            <span className="block font-light text-white/80 italic">Stack</span>
          </motion.h1>

          <motion.p
            className="text-xs sm:text-sm md:text-base font-light text-white/70 mb-5 sm:mb-6 md:mb-7 leading-relaxed max-w-xl mx-auto sm:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Join the most innovative hackathon where AI, ML, blockchain, and cutting-edge technology collide. Build, innovate, 
            and compete with the best minds in the tech community.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 md:gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Link to="/problems" className="w-full sm:w-auto">
              <motion.button
                className="w-full px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full bg-transparent border-2 border-white/30 text-white font-medium text-sm md:text-base transition-all duration-300 hover:bg-white/10 hover:border-cyan-400/50 hover:text-cyan-100 cursor-pointer backdrop-blur-sm sm:min-w-[160px] md:min-w-[180px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Problem Statement
              </motion.button>
            </Link>
            <Link to="/certificates" className="w-full sm:w-auto">
              <motion.button
                className="w-full px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full bg-transparent border-2 border-white/30 text-white font-medium text-sm md:text-base transition-all duration-300 hover:bg-white/10 hover:border-cyan-400/50 hover:text-cyan-100 cursor-pointer backdrop-blur-sm sm:min-w-[160px] md:min-w-[180px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Certificates
              </motion.button>
            </Link>
            <motion.a
              href="https://hack-with-stack.devfolio.co/application"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-orange-500 text-white font-semibold text-sm md:text-base transition-all duration-300 hover:from-cyan-400 hover:to-orange-400 cursor-pointer shadow-lg hover:shadow-xl inline-block text-center sm:min-w-[160px] md:min-w-[180px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.a>
          </motion.div>

          {/* AWS Brand Collaboration */}
          <motion.div
            className="mt-6 sm:mt-7 md:mt-9 flex flex-col sm:flex-row items-center sm:items-center gap-2.5 sm:gap-3 justify-center sm:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="text-xs sm:text-sm md:text-base font-light text-white/70 text-center sm:text-left">
              In Association with
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 border border-white/20">
              <img 
                src="/aws-logo.png" 
                alt="Amazon Web Services" 
                className="h-4 sm:h-5 md:h-6 w-auto object-contain opacity-90"
              />
            </div>
          </motion.div>
        </div>
      </main>

      <div className="absolute bottom-20 right-4 sm:bottom-12 sm:right-6 md:bottom-8 md:right-8 z-30">
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center">
          <PulsingBorder
            colors={["#06b6d4", "#0891b2", "#f97316", "#00FF88", "#FFD700", "#FF6B35", "#ffffff"]}
            colorBack="#00000000"
            speed={1.5}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
            }}
            className="sm:!w-[48px] sm:!h-[48px] md:!w-[60px] md:!h-[60px]"
          />

          {/* Rotating Text Around the Pulsing Border */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{ transform: "scale(1.4)" }}
          >
            <defs>
              <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            </defs>
            <text className="text-[10px] sm:text-xs md:text-sm fill-white/80 font-medium">
              <textPath href="#circle" startOffset="0%">
                AIML Club • AIML Club • AIML Club • AIML Club • AIML Club •
              </textPath>
            </text>
          </motion.svg>
        </div>
      </div>

      {/* Certificate Download Popup */}
      {showCertificatePopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCertificatePopup(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCertificatePopup(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <Award className="h-10 w-10 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                🎉 Certificates Available!
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Participated in Hack with Stack? Your certificate is ready to download!
              </p>

              <div className="space-y-3">
                <Link
                  to="/certificates"
                  onClick={() => setShowCertificatePopup(false)}
                  className="block w-full px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Download className="h-5 w-5" />
                    Download Certificate
                  </span>
                </Link>
                
                <button
                  onClick={() => setShowCertificatePopup(false)}
                  className="block w-full px-6 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300"
                >
                  Maybe Later
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Search by name, email, or certificate ID
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
