
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileText, Brain, Sparkles } from 'lucide-react'

const Header: React.FC = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className="bg-white shadow-lg border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Brain className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
              <Sparkles className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 cv-title">
                AI CV Formatter
              </h1>
              <p className="text-xs text-slate-500 cv-caption">
                Professional CV Processing
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors cv-body ${
                isActive('/') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/process"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors cv-body ${
                isActive('/process') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Brain className="h-4 w-4" />
              <span>Process CV</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
