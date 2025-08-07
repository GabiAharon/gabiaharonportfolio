import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Instagram, 
  Linkedin, 
  MessageCircle, 
  Mail, 
  ExternalLink, 
  Calendar, 
  BookOpen, 
  User, 
  Sparkles,
  ArrowRight,
  Globe,
  Play,
  X,
  Code,
  Star
} from "lucide-react";
import { useRouter } from 'next/router';
import { useLanguage } from './_app';
import translations from '../translations';
import Link from 'next/link';

export default function Home() {
  // Optional Spline embed URL via NEXT_PUBLIC_SPLINE_URL
  const splineUrl = process.env.NEXT_PUBLIC_SPLINE_URL || '';
  const [runtimeSplineUrl, setRuntimeSplineUrl] = useState('');

  useEffect(() => {
    try {
      const urlParam = new URLSearchParams(window.location.search).get('spline');
      if (urlParam) setRuntimeSplineUrl(urlParam);
    } catch (_) {
      // ignore
    }
  }, []);
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  
  // מצב לניהול פתיחת חלונות
  const [showTedTalks, setShowTedTalks] = useState(false);
  const [showWorkshopSelection, setShowWorkshopSelection] = useState(false);
  const [showAdminButton, setShowAdminButton] = useState(false);
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [screenWidth, setScreenWidth] = useState(0);
  
  // הפונקציה לתרגום טקסט
  const t = (key) => {
    return translations[language][key] || key;
  };
  
  // פונקציה להחלפת השפה
  const toggleLanguage = () => {
    const newLang = language === 'he' ? 'en' : 'he';
    setLanguage(newLang);
  };

  // Controls for intersection observers and animations
  const [activeSection, setActiveSection] = useState("hero");
  
  // Particle background animation effect
  const [particles, setParticles] = useState([]);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    // Create initial particles with responsive count
    const particleCount = window.innerWidth < 768 ? 30 : 50; // Less particles on mobile
    const initialParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.1 + 0.05, // Different speeds for variety
    }));
    setParticles(initialParticles);

    // Animate particles
    const animateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          y: (particle.y + particle.speed) % 100,
          opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.3 + 0.3,
        }))
      );
    };

    const interval = setInterval(animateParticles, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // הוספת מאזין לקיצור מקלדת סודי (Ctrl+Shift+A)
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        setShowAdminButton(true);
        setTimeout(() => setShowAdminButton(false), 10000); // מסתיר אחרי 10 שניות
      }
    };
    
    // הגדרת רוחב המסך
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    // הגדרה ראשונית
    handleResize();
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Mouse 3D tilt for hero
  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const rx = (dy / rect.height) * -10; // rotation X
    const ry = (dx / rect.width) * 10;  // rotation Y
    setTilt({ rx, ry });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  // פונקציות לטיפול בלחיצות
  const handleEmailClick = () => {
    window.open('mailto:Gabiaharon@gmail.com', '_blank');
  };

  const handleWhatsAppClick = () => {
    // השתמש במשתנה סביבה או קבוע מוצפן
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '972546436659';
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  const handleTickerClick = () => {
    handleWhatsAppClick();
  };

  const handleWorkshopSelection = (type) => {
    setShowWorkshopSelection(false);
    if (type === 'bodyLanguage') {
      // הפניה ישירה להורדת פלאייר שפת גוף
      const link = document.createElement('a');
      link.href = '/images/lectureflyer2.jpg';
      link.download = 'gabi-aharon-body-language-flyer.jpg';
      link.click();
    } else if (type === 'publicSpeaking') {
      // הפניה ישירה להורדת פלאייר עמידה מול קהל
      const link = document.createElement('a');
      link.href = '/images/lectureflyer1.jpg';
      link.download = 'gabi-aharon-public-speaking-flyer.jpg';
      link.click();
    }
  };

  // Social media links (ללא TikTok ו-YouTube)
  const socialLinks = [
    { name: "instagram", icon: <Instagram className="w-5 h-5" />, url: "https://instagram.com/gabi.aharon", color: "from-purple-500 to-pink-500" },
    { name: "linkedin", icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com/in/gabi-aharon", color: "from-blue-600 to-blue-400" },
    { name: "whatsapp", icon: <MessageCircle className="w-5 h-5" />, onClick: handleWhatsAppClick, color: "from-green-500 to-green-400" },
    { name: "email", icon: <Mail className="w-5 h-5" />, onClick: handleEmailClick, color: "from-blue-400 to-indigo-400" }
  ];

  // רשימת הרצאות TED מומלצות
  const tedTalks = [
    {
      title: "Your Body Language May Shape Who You Are",
      speaker: "Amy Cuddy",
      url: "https://www.ted.com/talks/amy_cuddy_your_body_language_may_shape_who_you_are",
      views: "71M+ views",
      image: "https://img.youtube.com/vi/Ks-_Mh1QhMc/mqdefault.jpg"
    },
    {
      title: "How to Speak So That People Want to Listen",
      speaker: "Julian Treasure",
      url: "https://www.ted.com/talks/julian_treasure_how_to_speak_so_that_people_want_to_listen",
      views: "50M+ views",
      image: "https://img.youtube.com/vi/eIho2S0ZahI/mqdefault.jpg"
    },
    {
      title: "The Power of Vulnerability",
      speaker: "Brené Brown",
      url: "https://www.ted.com/talks/brene_brown_the_power_of_vulnerability",
      views: "62M+ views",
      image: "https://img.youtube.com/vi/iCvmsMzlF7o/mqdefault.jpg"
    },
    {
      title: "The Puzzle of Motivation",
      speaker: "Dan Pink",
      url: "https://www.ted.com/talks/dan_pink_the_puzzle_of_motivation",
      views: "29M+ views",
      image: "https://img.youtube.com/vi/rrkrvAUbU9Y/mqdefault.jpg"
    },
    {
      title: "The Hidden Power of Social Networks",
      speaker: "Nicholas Christakis",
      url: "https://www.ted.com/talks/nicholas_christakis_the_hidden_influence_of_social_networks",
      views: "4M+ views",
      image: "https://img.youtube.com/vi/2U-tOghblfE/mqdefault.jpg"
    }
  ];

  

  // Featured links data (עודכן)
  const featuredLinks = [
    {
      title: "flyer",
      description: "flyerDesc",
      icon: <BookOpen className="w-6 h-6" />,
      onClick: () => setShowWorkshopSelection(true),
      color: "bg-gradient-to-r from-orange-500 to-red-500"
    },
    {
      title: "tedTalks",
      description: "tedTalksDesc",
      icon: <Play className="w-6 h-6" />,
      onClick: () => setShowTedTalks(true),
      color: "bg-gradient-to-r from-emerald-500 to-teal-500"
    },
    {
      title: "myProjects",
      description: "myProjectsDesc",
      icon: <Sparkles className="w-6 h-6" />,
      url: "/projects",
      color: "bg-gradient-to-r from-purple-600 to-pink-600"
    },
    {
      title: "testimonials",
      description: "testimonialsDesc",
      icon: <Star className="w-6 h-6" />,
      url: "/testimonials",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500"
    }
  ];

  // פונקציות לטיפול במיקום העכבר
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleProfileHover = (e, show) => {
    setShowProfileTooltip(show);
    if (show) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div className={`min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white overflow-hidden relative ${language === 'he' ? 'rtl' : 'ltr'}`}>
      {/* לוגו */}
      <div className="absolute top-4 left-4 z-40">
        <img 
          src="https://i.postimg.cc/j5MJ3Rmz/image.png" 
          alt="Gabi Aharon Logo" 
          className="h-12 w-auto transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* כפתור החלפת שפה */}
      <button 
        onClick={toggleLanguage}
        className="absolute top-4 right-4 z-40 bg-gray-800 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-gray-700"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{t('switchLanguage')}</span>
      </button>
      
      {/* כפתור אדמין נסתר */}
      {showAdminButton && (
        <Link 
          href="/projects"
          className="absolute top-16 right-4 z-40 bg-gray-800 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-gray-700"
          title="מצב אדמין"
        >
          <Code className="w-4 h-4" />
          <span className="text-sm">Admin</span>
        </Link>
      )}
      
      {/* 3D background: prefer Spline embed if URL provided; fallback to particles */}
      {(runtimeSplineUrl || splineUrl) ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe
            src={runtimeSplineUrl || splineUrl}
            title="Spline Scene"
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; clipboard-write; microphone; camera; display-capture; xr-spatial-tracking"
            style={{ background: 'transparent' }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                transition: 'all 0.5s linear',
                transform: 'translateZ(0)',
                zIndex: 1
              }}
            />
          ))}
        </div>
      )}
      
      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* Hero section */}
        <motion.section 
          id="hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-8 sm:py-12 lg:py-16 relative"
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={resetTilt}
        >
          {/* Profile photo with glowing effect */}
          <motion.div 
            className="relative mx-auto mb-6 sm:mb-8 z-50 animate-float"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onMouseEnter={(e) => handleProfileHover(e, true)}
            onMouseLeave={(e) => handleProfileHover(e, false)}
            onMouseMove={handleMouseMove}
          >
            <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden mx-auto relative z-50 cursor-pointer">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-60 rounded-full animate-glow-pulse z-10" style={{ animationDuration: '3s' }}></div>
              
              {/* Main profile image */}
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9d57c5_Untitleddesign1.png" 
                alt="Gabi Aharon" 
                className="w-full h-full object-cover object-center rounded-full relative z-50 ring-2 sm:ring-4 ring-white ring-opacity-20 shadow-2xl hover:ring-opacity-40 transition-all duration-300"
                style={{ 
                  position: 'relative', 
                  zIndex: 50,
                  objectFit: 'cover',
                  objectPosition: 'center center'
                }}
              />
              
              {/* Extra glow layer for emphasis */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-lg z-0"></div>
            </div>
            
            {/* Outer glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-20 blur-2xl scale-110 z-0 animate-gradient"></div>
          </motion.div>
          
          {/* Name and title */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-200 hover:from-blue-200 hover:to-purple-300 transition-all duration-500 px-4 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onMouseEnter={(e) => handleProfileHover(e, true)}
            onMouseLeave={(e) => handleProfileHover(e, false)}
            onMouseMove={handleMouseMove}
          >
            {t('title')}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative px-4"
          >
            <p className="text-base sm:text-lg text-gray-300 font-light mb-4 hover:text-gray-200 transition-colors duration-300">
              {t('subtitle')}
            </p>
            
            <div className="max-w-2xl mx-auto relative">
              <p className="text-lg sm:text-xl text-gray-200 italic relative z-10 hover:text-white transition-colors duration-300">
                "{t('quote')}"
              </p>
              {/* Subtle background glow for quote */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl rounded-lg"></div>
            </div>
          </motion.div>
        </motion.section>
        
        {/* Social media section */}
        <motion.section 
          id="social"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="py-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto">
            {socialLinks.map((link, index) => (
              <motion.div
                key={link.name}
                className={`group flex flex-col items-center bg-gradient-to-r ${link.color} p-0.5 rounded-xl cursor-pointer relative overflow-hidden`}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  transition: { delay: 0.3 + index * 0.1 } 
                }}
                onClick={link.onClick || (() => window.open(link.url, '_blank'))}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-700"></div>
                
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-xl p-4 relative z-10">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-800 bg-opacity-50 mb-2 group-hover:bg-opacity-70 transition-all duration-300 group-hover:scale-110">
                    {link.icon}
                  </div>
                  <span className="text-xs mt-1 group-hover:font-medium transition-all duration-300">{t(link.name)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Animated ticker for contact */}
        <motion.div 
          className="py-4 mt-6 mb-10 relative overflow-hidden cursor-pointer group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          onClick={handleTickerClick}
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 backdrop-blur-md rounded-full p-0.5 animate-gradient group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300">
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-full py-3 px-4 relative overflow-hidden group-hover:bg-opacity-70 transition-all duration-300">
              {/* Glowing background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="animate-marquee whitespace-nowrap flex items-center relative z-10">
                <span className="text-sm sm:text-base flex items-center mx-4 group-hover:font-medium transition-all duration-300">
                  💬 {t('ticker')}
                </span>
                <span className="text-sm sm:text-base flex items-center mx-4 group-hover:font-medium transition-all duration-300">
                  📞 {t('ticker')}
                </span>
                <span className="text-sm sm:text-base flex items-center mx-4 group-hover:font-medium transition-all duration-300">
                  ✨ {t('ticker')}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Featured Links */}
        <motion.section 
          id="featured-links"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="py-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">{t('featuredLinksTitle')}</h2>
          
          <div className="grid gap-4">
            {featuredLinks.map((link, index) => (
              <motion.div
                key={link.title}
                className="block group cursor-pointer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.4 + index * 0.1 }
                }}
                onClick={link.onClick || (() => window.open(link.url, '_self'))}
              >
                <div className={`${link.color} p-0.5 rounded-xl`}>
                  <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-xl px-6 py-4 h-full">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white bg-opacity-15 flex items-center justify-center flex-shrink-0">
                        {link.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold mb-1 text-right">{t(link.title)}</h3>
                        <p className="text-gray-300 text-sm text-right leading-relaxed">{t(link.description)}</p>
                      </div>
                      <div className="flex items-center text-white group-hover:text-blue-200 transition-colors">
                        <span className="text-sm font-medium ml-2">לחץ כאן</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        
        
        {/* Footer */}
        <motion.footer 
          className="py-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <p className="text-sm text-gray-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 mr-1" />
            {t('aiPowered')} ✨
          </p>
          <p className="text-xs text-gray-500 mt-4">{t('copyright')}</p>
        </motion.footer>
      </div>

      {/* TED Talks Modal */}
      <AnimatePresence>
        {showTedTalks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowTedTalks(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">{t('tedTalksTitle')}</h3>
                <button
                  onClick={() => setShowTedTalks(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                {tedTalks.map((talk, index) => (
                  <motion.a
                    key={index}
                    href={talk.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <img 
                          src={talk.image} 
                          alt={talk.title}
                          className="w-28 h-auto rounded-md object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex items-start gap-3 flex-1">
                        <Play className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{talk.title}</h4>
                          <p className="text-gray-300 text-sm mb-1">{talk.speaker}</p>
                          <p className="text-gray-400 text-xs">{talk.views}</p>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Workshop Selection Modal */}
      <AnimatePresence>
        {showWorkshopSelection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowWorkshopSelection(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">{t('workshopSelection')}</h3>
                <button
                  onClick={() => setShowWorkshopSelection(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <motion.button
                  onClick={() => handleWorkshopSelection('bodyLanguage')}
                  className="w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-right transition-all hover:from-purple-700 hover:to-pink-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{t('bodyLanguageOption')}</span>
                  </div>
                </motion.button>
                
                <motion.button
                  onClick={() => handleWorkshopSelection('publicSpeaking')}
                  className="w-full p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-right transition-all hover:from-blue-700 hover:to-indigo-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">{t('publicSpeakingOption')}</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Tooltip */}
      <AnimatePresence>
        {showProfileTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 400, damping: 25 }}
            className="fixed z-50 max-w-sm w-auto"
            style={{ 
              left: `${mousePosition.x + 15}px`, 
              top: `${mousePosition.y - 10}px`,
              pointerEvents: 'none',
              transform: mousePosition.x > screenWidth * 0.7 ? 'translateX(-100%)' : 'none'
            }}
          >
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-0.5 rounded-xl">
              <div className="bg-gray-900 bg-opacity-95 backdrop-blur-md rounded-xl p-4 relative">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-xl"></div>
                
                <div className="relative z-10">
                  <p className={`text-white leading-relaxed text-sm ${language === 'he' ? 'text-right' : 'text-left'}`}>
                    {t('profileHoverText')}
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1 left-1 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 