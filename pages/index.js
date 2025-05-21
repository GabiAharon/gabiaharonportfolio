import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Instagram, 
  Linkedin, 
  Youtube, 
  MessageCircle, 
  Mail, 
  ExternalLink, 
  Calendar, 
  BookOpen, 
  User, 
  Sparkles,
  ArrowRight,
  Globe
} from "lucide-react";
import { useRouter } from 'next/router';
import { useLanguage } from './_app';
import translations from '../translations';

export default function Home() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  
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
  
  useEffect(() => {
    // Generate random particles for background effect
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          speed: Math.random() * 0.2 + 0.1
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    
    // Set up interval to update particle positions
    const particleInterval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          y: particle.y > 100 ? 0 : particle.y + particle.speed,
          x: particle.x + (Math.random() - 0.5) * 0.2
        }))
      );
    }, 50);
    
    return () => clearInterval(particleInterval);
  }, []);

  // Social media links
  const socialLinks = [
    { name: "instagram", icon: <Instagram className="w-5 h-5" />, url: "https://instagram.com/gabi.aharon", color: "from-purple-500 to-pink-500" },
    { name: "linkedin", icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com/in/gabi-aharon", color: "from-blue-600 to-blue-400" },
    { name: "tiktok", icon: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path><path d="M15 9h0a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h0a4 4 0 0 1-4-4v0a4 4 0 0 1 4-4z"></path><path d="M8 21h8"></path><path d="M12 17v4"></path></svg>, url: "https://tiktok.com/@gabi.aharon", color: "from-black to-gray-800" },
    { name: "youtube", icon: <Youtube className="w-5 h-5" />, url: "https://youtube.com/c/gabi-aharon", color: "from-red-600 to-red-500" },
    { name: "whatsapp", icon: <MessageCircle className="w-5 h-5" />, url: "https://wa.me/123456789", color: "from-green-500 to-green-400" },
    { name: "email", icon: <Mail className="w-5 h-5" />, url: "mailto:contact@gabi-aharon.com", color: "from-blue-400 to-indigo-400" }
  ];

  // AI Projects data
  const aiProjects = [
    {
      title: "projectDigitalBody",
      description: "projectDigitalBodyDesc",
      imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e4?q=80&w=2070&auto=format&fit=crop",
      projectUrl: "#digital-body-language"
    },
    {
      title: "projectEmotionalGallery",
      description: "projectEmotionalGalleryDesc",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop",
      projectUrl: "#emotional-ai-gallery"
    },
    {
      title: "projectStory",
      description: "projectStoryDesc",
      imageUrl: "https://images.unsplash.com/photo-1546776310-eef45dd6d73c?q=80&w=2010&auto=format&fit=crop",
      projectUrl: "#interactive-storytelling"
    },
    {
      title: "projectPresence",
      description: "projectPresenceDesc",
      imageUrl: "https://images.unsplash.com/photo-1570610155223-66279ba81b41?q=80&w=1999&auto=format&fit=crop",
      projectUrl: "#presence-analysis"
    },
    {
      title: "projectCoach",
      description: "projectCoachDesc",
      imageUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=2070&auto=format&fit=crop",
      projectUrl: "#ai-communication-coach"
    }
  ];

  // Featured links data
  const featuredLinks = [
    {
      title: "watchTalk",
      description: "watchTalkDesc",
      icon: <Youtube className="w-6 h-6" />,
      url: "#ted-talk",
      color: "bg-gradient-to-r from-red-500 to-orange-500"
    },
    {
      title: "bookLecture",
      description: "bookLectureDesc",
      icon: <Calendar className="w-6 h-6" />,
      url: "#book-workshop",
      color: "bg-gradient-to-r from-blue-600 to-indigo-600"
    },
    {
      title: "courseTitle",
      description: "courseDesc",
      icon: <BookOpen className="w-6 h-6" />,
      url: "#body-language-course",
      color: "bg-gradient-to-r from-emerald-500 to-teal-500"
    },
    {
      title: "aiTools",
      description: "aiToolsDesc",
      icon: <Sparkles className="w-6 h-6" />,
      url: "#ai-tools",
      color: "bg-gradient-to-r from-purple-600 to-pink-600"
    }
  ];

  return (
    <div className={`min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white overflow-hidden relative ${language === 'he' ? 'rtl' : 'ltr'}`}>
      {/* כפתור החלפת שפה */}
      <button 
        onClick={toggleLanguage}
        className="absolute top-4 right-4 z-50 bg-gray-800 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-gray-700"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{t('switchLanguage')}</span>
      </button>
      
      {/* Animated particles background */}
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
              transition: 'all 0.5s linear'
            }}
          />
        ))}
      </div>
      
      {/* Content container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero section */}
        <motion.section 
          id="hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-16 relative"
        >
          {/* Profile photo with glowing effect */}
          <motion.div 
            className="relative mx-auto mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-50 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9d57c5_Untitleddesign1.png" 
                alt="Gabi Aharon" 
                className="w-full h-full object-cover rounded-full p-1"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-20 blur-xl -z-10"></div>
          </motion.div>
          
          {/* Name and title */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('title')}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-lg text-gray-300 font-light mb-4">
              {t('subtitle')}
            </p>
            
            <div className="max-w-2xl mx-auto">
              <p className="text-xl text-gray-200 italic">
                "{t('quote')}"
              </p>
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
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center bg-gradient-to-r ${link.color} p-0.5 rounded-xl`}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  transition: { delay: 0.3 + index * 0.1 } 
                }}
              >
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-800 bg-opacity-50 mb-2">
                    {link.icon}
                  </div>
                  <span className="text-xs mt-1">{t(link.name)}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>
        
        {/* Animated ticker for contact */}
        <motion.div 
          className="py-4 mt-6 mb-10 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-md rounded-full p-0.5">
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-full py-3 px-4 relative overflow-hidden">
              <div className="animate-marquee whitespace-nowrap flex items-center">
                <span className="text-sm sm:text-base flex items-center mx-4">
                  {t('ticker')}
                </span>
                <span className="text-sm sm:text-base flex items-center mx-4">
                  {t('ticker')}
                </span>
                <span className="text-sm sm:text-base flex items-center mx-4">
                  {t('ticker')}
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
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredLinks.map((link, index) => (
              <motion.a
                key={link.title}
                href={link.url}
                className="block group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.4 + index * 0.1 }
                }}
              >
                <div className={`h-full ${link.color} p-0.5 rounded-xl`}>
                  <div className="h-full bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-xl p-6 flex items-center transition-all duration-300 group-hover:bg-opacity-75">
                    <div className="mr-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                        {link.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{t(link.title)}</h3>
                      <p className="text-sm text-gray-300">{t(link.description)}</p>
                    </div>
                    <motion.div 
                      className="ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </motion.div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>
        
        {/* AI Projects */}
        <motion.section 
          id="projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="py-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">{t('projectsTitle')}</h2>
          <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">{t('projectsSubtitle')}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {aiProjects.map((project, index) => (
              <motion.div 
                key={project.title}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.5 + index * 0.1 }
                }}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a href={project.projectUrl} className="block">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-0.5 rounded-xl h-full">
                    <div className="bg-gray-900 rounded-xl overflow-hidden h-full">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={project.imageUrl} 
                          alt={t(project.title)} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-bold mb-2">{t(project.title)}</h3>
                        <p className="text-gray-300 text-sm mb-4">{t(project.description)}</p>
                        <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                          <span className="text-sm font-medium">{t('viewProject')}</span>
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
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
          <p className="text-gray-300 mb-3">"{t('footerQuote')}"</p>
          <p className="text-sm text-gray-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 mr-1" />
            {t('aiPowered')} ✨
          </p>
          <p className="text-xs text-gray-500 mt-4">{t('copyright')}</p>
        </motion.footer>
      </div>
    </div>
  );
} 