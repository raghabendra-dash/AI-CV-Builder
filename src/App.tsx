
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import CVProcessor from './pages/CVProcessor'
import CVEditor from './pages/CVEditor'
import './styles/fonts.css'

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: { 
            background: '#1f2937', 
            color: '#f9fafb',
            fontFamily: 'Palatino Linotype, serif'
          },
          success: { style: { background: '#059669' } },
          error: { style: { background: '#dc2626' } },
          loading: { style: { background: '#3b82f6' } }
        }}
      />
      
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Header />
          
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/process" element={<CVProcessor />} />
              <Route path="/edit/:id" element={<CVEditor />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  )
}

export default App
