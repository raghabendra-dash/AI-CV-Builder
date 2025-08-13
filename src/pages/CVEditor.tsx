
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Save, RefreshCw, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useCVData } from '../hooks/useCVData'
import CVPreview from '../components/CVPreview'
import CVEditForm from '../components/CVEditForm'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const CVEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getCVDocument, updateCVDocument } = useCVData()
  
  const [cvData, setCVData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [hasChanges, setHasChanges] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      loadCVData()
    } else {
      setError('No document ID provided')
      setLoading(false)
    }
  }, [id])

  const loadCVData = async () => {
    if (!id) return
    
    try {
      setLoading(true)
      setError(null)
      
      console.log('Loading CV data for ID:', id)
      const data = await getCVDocument(id)
      
      if (data) {
        console.log('CV data loaded:', data)
        setCVData(data)
      } else {
        setError('CV document not found')
      }
    } catch (error: any) {
      console.error('Error loading CV data:', error)
      setError(error?.message || 'Failed to load CV data')
    } finally {
      setLoading(false)
    }
  }

  const handleDataChange = (newData: any) => {
    if (!cvData) return
    
    const updatedCVData = {
      ...cvData,
      processedContent: newData
    }
    
    setCVData(updatedCVData)
    setHasChanges(true)
  }

  const handleSave = async () => {
    if (!id || !cvData) return

    try {
      setSaving(true)
      const result = await updateCVDocument(id, cvData)
      
      if (result) {
        setHasChanges(false)
        toast.success('CV saved successfully')
      } else {
        toast.error('Failed to save CV')
      }
    } catch (error: any) {
      console.error('Save error:', error)
      toast.error('Failed to save CV')
    } finally {
      setSaving(false)
    }
  }

  const handleExport = () => {
    // Implementation for exporting CV as PDF
    toast.success('Export functionality coming soon')
  }

  const handleReprocess = async () => {
    if (!id) return
    
    try {
      // Implementation for reprocessing CV with AI
      toast.success('Reprocessing CV...')
    } catch (error) {
      toast.error('Failed to reprocess CV')
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-slate-600 cv-body">Loading CV data...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-red-800 cv-subtitle mb-2">Unable to Load CV</h2>
          <p className="text-red-700 cv-body mb-4">{error}</p>
          
          <div className="flex justify-center space-x-3">
            <button
              onClick={loadCVData}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cv-body"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Retry</span>
            </button>
            
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cv-body"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // No data state
  if (!cvData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-slate-600 cv-subtitle">CV not found</h2>
        <p className="text-slate-500 cv-body mt-2">The requested CV could not be loaded.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 text-blue-600 hover:text-blue-700 cv-body"
        >
          Return to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-slate-800 cv-title">
              {cvData.fileName || 'Untitled CV'}
            </h1>
            <p className="text-sm text-slate-600 cv-caption">
              Last updated: {cvData.updatedAt ? new Date(cvData.updatedAt).toLocaleString() : 'Unknown'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cv-body"
          >
            {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
          </button>
          
          <button
            onClick={handleReprocess}
            className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cv-body"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reprocess</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors cv-body ${
              hasChanges && !saving
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {saving ? (
              <LoadingSpinner size="small" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>
          
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cv-body"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </motion.div>

      {/* Editor Layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`grid gap-6 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}
      >
        {/* Edit Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-medium text-slate-800 cv-subtitle">Edit CV Content</h2>
            <p className="text-sm text-slate-600 cv-caption mt-1">
              Make changes to your CV content and see the preview update in real-time
            </p>
          </div>
          
          <div className="p-6">
            <CVEditForm
              data={cvData.processedContent || {}}
              onChange={handleDataChange}
            />
          </div>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-medium text-slate-800 cv-subtitle">CV Preview</h2>
              <p className="text-sm text-slate-600 cv-caption mt-1">
                Professional formatted preview with EHS standards
              </p>
            </div>
            
            <div className="p-6">
              <CVPreview data={cvData.processedContent || {}} />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default CVEditor
