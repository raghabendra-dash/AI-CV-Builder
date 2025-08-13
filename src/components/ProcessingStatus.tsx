
import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Brain, FileText, Sparkles, AlertCircle } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'

interface ProcessingStatusProps {
  fileName: string
  fileSize: string
  progress: number
  currentStep: string
  isProcessing: boolean
  error?: string
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  fileName,
  fileSize,
  progress,
  currentStep,
  isProcessing,
  error
}) => {
  const steps = [
    { id: 'upload', label: 'File Upload', icon: FileText },
    { id: 'extraction', label: 'Content Extraction', icon: Brain },
    { id: 'parsing', label: 'AI Parsing', icon: Sparkles },
    { id: 'formatting', label: 'Professional Formatting', icon: CheckCircle }
  ]

  const getStepStatus = (stepId: string) => {
    const stepIndex = steps.findIndex(s => s.id === stepId)
    const currentIndex = steps.findIndex(s => s.id === currentStep)
    
    if (error) {
      return stepIndex <= currentIndex ? 'error' : 'pending'
    }
    
    if (stepIndex < currentIndex) return 'completed'
    if (stepIndex === currentIndex) return isProcessing ? 'active' : 'completed'
    return 'pending'
  }

  const getStepIcon = (step: any, status: string) => {
    const IconComponent = step.icon
    
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'active':
        return <LoadingSpinner size="small" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <IconComponent className="h-5 w-5 text-slate-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* File Info */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-slate-800 cv-subtitle">
          Processing Your CV
        </h3>
        <div className="space-y-1">
          <p className="text-slate-600 cv-body">{fileName}</p>
          <p className="text-sm text-slate-500 cv-caption">{fileSize}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm cv-caption">
          <span className="text-slate-600">Progress</span>
          <span className="text-slate-800 font-medium">{Math.round(progress)}%</span>
        </div>
        
        <div className="w-full bg-slate-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Processing Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id)
          
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                status === 'active' ? 'bg-blue-50 border border-blue-200' :
                status === 'completed' ? 'bg-green-50 border border-green-200' :
                status === 'error' ? 'bg-red-50 border border-red-200' :
                'bg-slate-50 border border-slate-200'
              }`}
            >
              <div className="flex-shrink-0">
                {getStepIcon(step, status)}
              </div>
              
              <div className="flex-1">
                <p className={`font-medium cv-body ${
                  status === 'active' ? 'text-blue-800' :
                  status === 'completed' ? 'text-green-800' :
                  status === 'error' ? 'text-red-800' :
                  'text-slate-600'
                }`}>
                  {step.label}
                </p>
                
                {status === 'active' && (
                  <p className="text-sm text-blue-600 cv-caption mt-1">
                    Processing...
                  </p>
                )}
                
                {status === 'completed' && (
                  <p className="text-sm text-green-600 cv-caption mt-1">
                    Completed
                  </p>
                )}
                
                {status === 'error' && (
                  <p className="text-sm text-red-600 cv-caption mt-1">
                    Failed
                  </p>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <h4 className="font-medium text-red-800 cv-body">Processing Error</h4>
          </div>
          <p className="text-sm text-red-700 cv-caption mt-2">{error}</p>
        </motion.div>
      )}

      {/* Success Message */}
      {progress === 100 && !error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border border-green-200 rounded-lg text-center"
        >
          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <h4 className="font-medium text-green-800 cv-body">Processing Complete!</h4>
          <p className="text-sm text-green-700 cv-caption mt-1">
            Your CV has been successfully processed and formatted.
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default ProcessingStatus
