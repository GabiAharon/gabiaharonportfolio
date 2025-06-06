import React from 'react';
import Layout from '../components/Layout';
import { Download, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Flyer() {
  return (
    <Layout language="he">
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rtl">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center text-white hover:text-purple-300 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5 ml-2" />
            חזרה לעמוד הבית
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              פלאייר הרצאות
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              הורד את הפלאייר שלי להזמנת הרצאות בנושאי שפת גוף ועמידה מול קהל
            </p>
          </div>

          {/* Flyer Display */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                
                {/* Flyer Image */}
                <div className="order-2 md:order-1">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img 
                      src="/images/lecture.jpg" 
                      alt="פלאייר הרצאות גבי אהרון - תקשורת לא מילולית"
                      className="w-full h-auto"
                      onError={(e) => {
                        // אם התמונה לא נטענת, נציג את הפלאייר הדיגיטלי
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-96 bg-gradient-to-br from-orange-400 via-red-500 to-purple-600 flex items-center justify-center text-white" style={{display: 'none'}}>
                      <div className="text-center p-8">
                        <h3 className="text-2xl font-bold mb-4">גבי אהרון</h3>
                        <h4 className="text-xl mb-4">תקשורת לא מילולית</h4>
                        <div className="space-y-2 text-sm">
                          <p>🎯 שפת גוף ותקשורת לא מילולית</p>
                          <p>🎤 עמידה מול קהל ומיומנויות מצגת</p>
                          <p>📞 להזמנות: 054-643-6659</p>
                          <p>📧 Gabiaharon@gmail.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="order-1 md:order-2 text-white">
                  <h2 className="text-3xl font-bold mb-6">תקשורת לא מילולית</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="bg-white/20 rounded-lg p-4">
                      <h3 className="text-xl font-semibold mb-2">🎯 שפת גוף</h3>
                      <p className="text-gray-200">
                        למד לקרוא ולהשתמש בשפת הגוף בצורה יעילה בפגישות עסקיות ובחיי היומיום
                      </p>
                    </div>
                    
                    <div className="bg-white/20 rounded-lg p-4">
                      <h3 className="text-xl font-semibold mb-2">🎤 עמידה מול קהל</h3>
                      <p className="text-gray-200">
                        טכניקות מתקדמות לנוכחות בימתית מרשימה והעברת מסרים בצורה משפיעה
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-semibold text-white mb-3">בחר את סוג ההרצאה להורדת הפלאייר:</h4>
                    </div>
                    
                    <a 
                      href="/images/lectureflyer1.jpg" 
                      download="gabi-aharon-public-speaking-flyer.jpg"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      🎤 הורד פלאייר - עמידה מול קהל
                    </a>
                    
                    <a 
                      href="/images/lectureflyer2.jpg" 
                      download="gabi-aharon-body-language-flyer.jpg"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      🎯 הורד פלאייר - שפת גוף
                    </a>
                    
                    <button 
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: 'פלאייר הרצאות גבי אהרון',
                            text: 'הרצאות מרתקות בנושאי תקשורת לא מילולית - גבי אהרון',
                            url: window.location.href
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          alert('הקישור הועתק ללוח');
                        }
                      }}
                      className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-5 h-5" />
                      שתף דף פלאיירים
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="max-w-2xl mx-auto mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">מעוניין להזמין הרצאה?</h3>
              <p className="text-gray-300 mb-6">
                צור קשר עוד היום לתיאום הרצאה מותאמת אישית לארגון שלך
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:Gabiaharon@gmail.com" 
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  📧 שלח מייל
                </a>
                <a 
                  href="https://wa.me/972546436659" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  📞 וואטסאפ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 