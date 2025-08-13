
import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, AlertCircle, CheckCircle, Brain, Loader2 } from 'lucide-react'
import { useCVProcessing } from '../hooks/useCVProcessing'
import ProcessingStatus from '../components/ProcessingStatus'
import toast from 'react-hot-toast'

const CVProcessor: React.FC = () => {
  const navigate = useNavigate()
  const { uploadAndProcessCV, processing, progress, currentStep } = useCVProcessing()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [processingId, setProcessingId] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setUploadedFile(file)
    
    try {
      const result = await uploadAndProcessCV(file)
      setProcessingId(result.documentId)
      
      // Navigate to editor when processing is complete
      if (result.status === 'completed') {
        toast.success('CV processed successfully!')
        setTimeout(() => {
          navigate(`/edit/${result.documentId}`)
        }, 1000)
      }
    } catch (error) {
      toast.error('Failed to process CV. Please try again.')
      setUploadedFile(null)
      setProcessingId(null)
    }
  }, [uploadAndProcessCV, navigate])

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: processing
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl font-bold text-slate-800 cv-title">
          Process Your CV
        </h1>
        <p className="text-lg text-slate-600 cv-body max-w-2xl mx-auto">
          Upload your CV in PDF, DOCX, or Excel format. Our AI will intelligently extract, 
          parse, and format your content according to professional EHS standards.
        </p>
      </motion.div>

      {/* Upload Area */}
      {!processing && !processingId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-8"
        >
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
              isDragActive
                ? 'border-blue-400 bg-blue-50'
                : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <input {...getInputProps()} />
            
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              
              {isDragActive ? (
                <div>
                  <h3 className="text-lg font-medium text-blue-600 cv-subtitle">
                    Drop your CV here
                  </h3>
                  <p className="text-blue-500 cv-body">
                    Release to upload and process
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-medium text-slate-800 cv-subtitle">
                    Drag & drop your CV here
                  </h3>
                  <p className="text-slate-600 cv-body">
                    or <span className="text-blue-600 font-medium">click to browse</span>
                  </p>
                </div>
              )}
              
              <div className="text-sm text-slate-500 cv-caption space-y-1">
                <p>Supported formats: PDF, DOCX, XLS, XLSX</p>
                <p>Maximum file size: 10MB</p>
              </div>
            </div>
          </div>

          {/* File Rejections */}
          {fileRejections.length > 0 && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h4 className="font-medium text-red-800 cv-body">Upload Error</h4>
              </div>
              <ul className="mt-2 text-sm text-red-700 cv-caption space-y-1">
                {fileRejections.map(({ file, errors }) => (
                  <li key={file.name}>
                    {file.name}: {errors.map(e => e.message).join(', ')}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Supported Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium text-slate-800 cv-body">AI-Powered Parsing</h4>
              <p className="text-sm text-slate-600 cv-caption">
                Intelligent extraction using multiple AI agents
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-slate-800 cv-body">EHS Standards</h4>
              <p className="text-sm text-slate-600 cv-caption">
                Professional formatting with Palatino Linotype
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-slate-800 cv-body">Content Enhancement</h4>
              <p className="text-sm text-slate-600 cv-caption">
                Grammar correction and professional language
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Processing Status */}
      {(processing || processingId) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-8"
        >
          <ProcessingStatus
            fileName={uploadedFile?.name || 'Unknown file'}
            fileSize={uploadedFile?.size ? formatFileSize(uploadedFile.size) : ''}
            progress={progress}
            currentStep={currentStep}
            isProcessing={processing}
          />
          
          {processingId && !processing && (
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate(`/edit/${processingId}`)}
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cv-body"
              >
                <FileText className="h-5 w-5" />
                <span>View Processed CV</span>
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Processing Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <h3 className="font-medium text-blue-800 cv-subtitle mb-3">Processing Tips</h3>
        <ul className="text-sm text-blue-700 cv-caption space-y-2">
          <li>• Ensure your CV contains clear section headers (Experience, Education, Skills)</li>
          <li>• Include complete contact information and professional summary</li>
          <li>• High-quality scanned documents work better than low-resolution images</li>
          <li>• Processing typically takes 30-60 seconds depending on document complexity</li>
        </ul>
      </motion.div>
    </div>
  )
}

export default CVProcessor
