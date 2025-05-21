import React from 'react'
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-5">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">
        404 - הדף לא נמצא
      </h1>
      <p className="text-gray-300 mb-8">
        הדף שאתה מחפש אינו קיים או שהוזז
      </p>
      <Link href="/" className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity">
        חזרה לדף הבית
      </Link>
    </div>
  )
} 