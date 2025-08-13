
import { useState, useCallback } from 'react'
import { lumi } from '../lib/lumi'
import toast from 'react-hot-toast'

interface CVDocument {
  _id: string
  fileName: string
  fileType: string
  originalContent: string
  processedContent: any
  formattedContent?: string
  status: string
  processingLogs: any[]
  metadata: any
  creator: string
  createdAt: string
  updatedAt: string
}

export const useCVData = () => {
  const [cvDocuments, setCVDocuments] = useState<CVDocument[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCVDocuments = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('Fetching CV documents...')
      
      // Use correct SDK method for listing entities
      const response = await lumi.entities.cv_documents.list()
      console.log('Raw response:', response)
      
      // Handle different response structures
      const documents = response?.list || response?.data || response || []
      
      // Ensure we have an array
      const validDocuments = Array.isArray(documents) ? documents : []
      
      console.log('Processed documents:', validDocuments)
      setCVDocuments(validDocuments)
      
      if (validDocuments.length === 0) {
        console.log('No CV documents found')
      }
      
    } catch (err: any) {
      console.error('Error fetching CV documents:', err)
      const errorMessage = err?.message || err?.error || 'Failed to fetch CV documents'
      setError(errorMessage)
      
      // Don't show toast for empty collections
      if (!errorMessage.includes('not found') && !errorMessage.includes('empty')) {
        toast.error(`Loading error: ${errorMessage}`)
      }
      
      // Set empty array on error to prevent undefined issues
      setCVDocuments([])
    } finally {
      setLoading(false)
    }
  }, [])

  const getCVDocument = useCallback(async (id: string): Promise<CVDocument | null> => {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid document ID provided')
    }

    try {
      setLoading(true)
      setError(null)
      
      console.log('Fetching CV document with ID:', id)
      
      // Try different SDK methods to find the correct one
      let document = null
      
      try {
        // Method 1: Try get method
        document = await lumi.entities.cv_documents.get(id)
      } catch (getError) {
        console.log('get method failed, trying find...')
        
        try {
          // Method 2: Try find with ID filter
          const results = await lumi.entities.cv_documents.find({ _id: id })
          document = results && results.length > 0 ? results[0] : null
        } catch (findError) {
          console.log('find method failed, trying list with filter...')
          
          try {
            // Method 3: Try list and filter
            const allDocs = await lumi.entities.cv_documents.list()
            const docList = allDocs?.list || allDocs?.data || allDocs || []
            document = Array.isArray(docList) ? docList.find((doc: any) => doc._id === id) : null
          } catch (listError) {
            console.error('All methods failed:', { getError, findError, listError })
            throw new Error('Unable to fetch document with any available method')
          }
        }
      }
      
      if (!document) {
        throw new Error('CV document not found')
      }
      
      console.log('Retrieved document:', document)
      return document
      
    } catch (err: any) {
      console.error('Error fetching CV document:', err)
      const errorMessage = err?.message || 'Failed to fetch CV document'
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const createCVDocument = useCallback(async (data: Partial<CVDocument>): Promise<CVDocument | null> => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('Creating CV document with data:', data)
      
      // Ensure required fields have defaults
      const documentData = {
        fileName: data.fileName || 'untitled.pdf',
        fileType: data.fileType || 'pdf',
        originalContent: data.originalContent || '',
        processedContent: data.processedContent || {},
        status: data.status || 'uploaded',
        processingLogs: data.processingLogs || [],
        metadata: data.metadata || {},
        creator: data.creator || 'unknown',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data
      }
      
      const newDocument = await lumi.entities.cv_documents.create(documentData)
      console.log('Created document:', newDocument)
      
      // Refresh the list after creation
      await fetchCVDocuments()
      
      toast.success('CV document created successfully')
      return newDocument
      
    } catch (err: any) {
      console.error('Error creating CV document:', err)
      const errorMessage = err?.message || 'Failed to create CV document'
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }, [fetchCVDocuments])

  const updateCVDocument = useCallback(async (id: string, updates: Partial<CVDocument>): Promise<CVDocument | null> => {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid document ID for update')
    }

    try {
      setLoading(true)
      setError(null)
      
      console.log('Updating CV document:', id, updates)
      
      // Add updated timestamp
      const updateData = {
        ...updates,
        updatedAt: new Date().toISOString()
      }
      
      // Use correct SDK parameter order: ID first, data second
      const updatedDocument = await lumi.entities.cv_documents.update(id, updateData)
      console.log('Updated document:', updatedDocument)
      
      // Update local state optimistically
      setCVDocuments(prev => 
        prev.map(doc => doc._id === id ? { ...doc, ...updatedDocument } : doc)
      )
      
      return updatedDocument
      
    } catch (err: any) {
      console.error('Error updating CV document:', err)
      const errorMessage = err?.message || 'Failed to update CV document'
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteCVDocument = useCallback(async (id: string): Promise<boolean> => {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid document ID for deletion')
    }

    try {
      setLoading(true)
      setError(null)
      
      console.log('Deleting CV document:', id)
      
      // Ensure ID is string, not object
      await lumi.entities.cv_documents.delete(id)
      
      // Update local state immediately
      setCVDocuments(prev => prev.filter(doc => doc._id !== id))
      
      console.log('Document deleted successfully')
      toast.success('CV document deleted successfully')
      return true
      
    } catch (err: any) {
      console.error('Error deleting CV document:', err)
      const errorMessage = err?.message || 'Failed to delete CV document'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const updateCVStatus = useCallback(async (id: string, status: string, logs?: any[]): Promise<boolean> => {
    try {
      const updates: any = { 
        status,
        updatedAt: new Date().toISOString()
      }
      
      if (logs && Array.isArray(logs)) {
        updates.processingLogs = logs
      }
      
      const result = await updateCVDocument(id, updates)
      return result !== null
      
    } catch (err: any) {
      console.error('Error updating CV status:', err)
      return false
    }
  }, [updateCVDocument])

  // Helper function to clear errors
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    cvDocuments,
    loading,
    error,
    fetchCVDocuments,
    getCVDocument,
    createCVDocument,
    updateCVDocument,
    deleteCVDocument,
    updateCVStatus,
    clearError
  }
}
