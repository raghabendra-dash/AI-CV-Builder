
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Upload, Brain, CheckCircle, Clock, AlertCircle, Eye, Download, Trash2 } from 'lucide-react'
import { useCVData } from '../hooks/useCVData'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const Dashboard: React.FC = () => {
  const { cvDocuments, loading, error, fetchCVDocuments, deleteCVDocument, clearError } = useCVData()
  const [stats, setStats] = useState({
    total: 0,
    processed: 0,
    processing: 0,
    failed: 0
  })

  useEffect(() => {
    console.log('Dashboard mounted, fetching CV documents...')
    fetchCVDocuments()
  }, [fetchCVDocuments])

  useEffect(() => {
    console.log('CV documents updated:', cvDocuments)
    
    if (Array.isArray(cvDocuments) && cvDocuments.length > 0) {
      const newStats = cvDocuments.reduce((acc, doc) => {
        acc.total++
        switch (doc?.status) {
          case 'processed':
          case 'formatted':
            acc.processed++
            break
          case 'processing':
            acc.processing++
            break
          case 'error':
          case 'failed':
            acc.failed++
            break
        }
        return acc
      }, { total: 0, processed: 0, processing: 0, failed: 0 })
      
      setStats(newStats)
    } else {
      setStats({ total: 0, processed: 0, processing: 0, failed: 0 })
    }
  }, [cvDocuments])

  const handleDelete = async (id: string, fileName: string) => {
    if (!id) {
      toast.error('Invalid document ID')
      return
    }

    if (confirm(`Are you sure you want to delete "${fileName}"?`)) {
      try {
        const success = await deleteCVDocument(id)
        if (!success) {
          toast.error('Failed to delete CV')
        }
      } catch (error) {
        console.error('Delete error:', error)
        toast.error('Failed to delete CV')
      }
    }
  }

  const handleRetry = async () => {
    console.log('Retrying CV documents fetch...')
    clearError()
    await fetchCVDocuments()
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed':
      case 'formatted':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />
      case 'error':
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <FileText className="h-5 w-5 text-slate-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processed':
        return 'Processed'
      case 'formatted':
        return 'Formatted'
      case 'processing':
        return 'Processing...'
      case 'error':
      case 'failed':
        return 'Failed'
      case 'uploaded':
        return 'Uploaded'
      default:
        return 'Unknown'
    }
  }

  // Error state
  if (error && !loading) {
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-slate-800 cv-title">
            AI-Powered CV Formatter
          </h1>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h2 className="text-xl font-medium text-red-800 cv-subtitle">Loading Error</h2>
            </div>
            
            <p className="text-red-700 cv-body mb-4">
              {error}
            </p>
            
            <div className="flex justify-center space-x-3">
              <button
                onClick={handleRetry}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cv-body"
              >
                Try Again
              </button>
              
              <Link
                to="/process"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cv-body"
              >
                Upload New CV
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  // Loading state
  if (loading) {
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-slate-800 cv-title">
            AI-Powered CV Formatter
          </h1>
          
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <LoadingSpinner size="large" />
              <p className="mt-4 text-slate-600 cv-body">Loading CV documents...</p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-slate-800 cv-title">
          AI-Powered CV Formatter
        </h1>
        <p className="text-lg text-slate-600 cv-body max-w-2xl mx-auto">
          Transform raw, unstructured CVs into polished, professional documents using advanced AI technology. 
          Support for PDF, DOCX, and Excel formats with intelligent parsing and EHS formatting standards.
        </p>
        
        <div className="flex justify-center">
          <Link
            to="/process"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cv-body"
          >
            <Upload className="h-5 w-5" />
            <span>Upload New CV</span>
          </Link>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 cv-caption">Total CVs</p>
              <p className="text-2xl font-bold text-slate-800 cv-title">{stats.total}</p>
            </div>
            <FileText className="h-8 w-8 text-slate-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 cv-caption">Processed</p>
              <p className="text-2xl font-bold text-green-600 cv-title">{stats.processed}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 cv-caption">Processing</p>
              <p className="text-2xl font-bold text-blue-600 cv-title">{stats.processing}</p>
            </div>
            <Brain className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 cv-caption">Failed</p>
              <p className="text-2xl font-bold text-red-600 cv-title">{stats.failed}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-400" />
          </div>
        </div>
      </motion.div>

      {/* Recent CVs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-slate-200"
      >
        <div className="p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-800 cv-subtitle">Recent CVs</h2>
            <p className="text-sm text-slate-600 cv-caption mt-1">
              Manage and review your processed CVs
            </p>
          </div>
        </div>

        <div className="p-6">
          {!Array.isArray(cvDocuments) || cvDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 cv-subtitle mb-2">
                {error ? 'Unable to load CVs' : 'No CVs yet'}
              </h3>
              <p className="text-slate-500 cv-body mb-6">
                {error 
                  ? 'There was an issue loading your CV documents. Please try uploading a new CV.'
                  : 'Upload your first CV to get started with AI-powered formatting'
                }
              </p>
              <div className="flex justify-center">
                <Link
                  to="/process"
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cv-body"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload CV</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {cvDocuments.map((doc) => (
                <motion.div
                  key={doc._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(doc.status)}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-slate-800 cv-body">{doc.fileName || 'Untitled CV'}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-slate-500 cv-caption">
                          {getStatusText(doc.status)}
                        </span>
                        <span className="text-sm text-slate-500 cv-caption">
                          {doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : 'Unknown date'}
                        </span>
                        <span className="text-sm text-slate-500 cv-caption uppercase">
                          {doc.fileType || 'Unknown'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {(doc.status === 'processed' || doc.status === 'formatted') && (
                      <>
                        <Link
                          to={`/edit/${doc._id}`}
                          className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View/Edit CV"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        
                        <button
                          className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Download CV"
                          onClick={() => toast.success('Download functionality coming soon')}
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    
                    <button
                      onClick={() => handleDelete(doc._id, doc.fileName)}
                      className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete CV"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
