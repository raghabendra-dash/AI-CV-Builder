
import React from 'react'
import { motion } from 'framer-motion'

interface CVPreviewProps {
  data: any
}

const CVPreview: React.FC<CVPreviewProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="text-center py-8 text-slate-500 cv-body">
        No CV data to preview
      </div>
    )
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${months[date.getMonth()]} ${date.getFullYear()}`
  }

  const capitalizeJobTitle = (title: string) => {
    return title.replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="cv-preview bg-white border border-slate-300 rounded-lg p-8 shadow-sm"
      style={{ fontFamily: 'Palatino Linotype, serif' }}
    >
      {/* Header Section */}
      <div className="border-b border-slate-300 pb-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-800 cv-title mb-2">
              {data.personalInfo?.name || 'Name Not Available'}
            </h1>
            <h2 className="text-lg text-slate-600 cv-subtitle mb-4">
              {capitalizeJobTitle(data.personalInfo?.jobTitle || 'Job Title Not Available')}
            </h2>
          </div>
          
          {/* Professional Photo Placeholder */}
          <div className="w-24 h-32 bg-slate-200 border border-slate-300 rounded flex items-center justify-center text-xs text-slate-500 cv-caption ml-6">
            Professional Photo
            <br />
            4.7cm
          </div>
        </div>
      </div>

      {/* Personal Details */}
      {data.personalInfo && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-800 cv-subtitle mb-3 border-b border-slate-200 pb-1">
            PERSONAL DETAILS
          </h3>
          <div className="grid grid-cols-2 gap-4 cv-body text-slate-700">
            {data.personalInfo.nationality && (
              <div>
                <span className="font-medium">Nationality:</span> {data.personalInfo.nationality}
              </div>
            )}
            {data.personalInfo.languages && (
              <div>
                <span className="font-medium">Languages:</span> {Array.isArray(data.personalInfo.languages) 
                  ? data.personalInfo.languages.join(', ') 
                  : data.personalInfo.languages}
              </div>
            )}
            {data.personalInfo.dateOfBirth && (
              <div>
                <span className="font-medium">Date of Birth:</span> {formatDate(data.personalInfo.dateOfBirth)}
              </div>
            )}
            {data.personalInfo.maritalStatus && (
              <div>
                <span className="font-medium">Marital Status:</span> {data.personalInfo.maritalStatus}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Profile */}
      {data.profile && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-800 cv-subtitle mb-3 border-b border-slate-200 pb-1">
            PROFILE
          </h3>
          <p className="cv-body text-slate-700 leading-relaxed">
            {data.profile}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-800 cv-subtitle mb-3 border-b border-slate-200 pb-1">
            EXPERIENCE
          </h3>
          <div className="space-y-4">
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="cv-body text-slate-700">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold">
                      {capitalizeJobTitle(exp.position || 'Position')}
                    </h4>
                    <p className="font-medium text-slate-600">
                      {exp.company || 'Company'}
                    </p>
                  </div>
                  <span className="text-slate-600 text-sm cv-caption">
                    {formatDate(exp.startDate)} - {exp.endDate === 'Present' ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {exp.responsibilities.map((resp: string, respIndex: number) => (
                      <li key={respIndex} className="leading-relaxed">
                        {resp.replace(/^I am responsible for\s*/i, 'Responsible for ')
                             .replace(/^I\s+/i, '')
                             .replace(/\bprinciple\b/gi, 'principal')
                             .replace(/\bdiscrete\b/gi, 'discreet')}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-800 cv-subtitle mb-3 border-b border-slate-200 pb-1">
            EDUCATION
          </h3>
          <div className="space-y-3">
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="cv-body text-slate-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{edu.degree || 'Degree'}</h4>
                    <p className="text-slate-600">{edu.institution || 'Institution'}</p>
                  </div>
                  <span className="text-slate-600 text-sm cv-caption">
                    {formatDate(edu.graduationDate) || edu.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-800 cv-subtitle mb-3 border-b border-slate-200 pb-1">
            KEY SKILLS
          </h3>
          <ul className="list-disc list-inside cv-body text-slate-700 space-y-1 ml-4">
            {data.skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Interests */}
      {data.interests && data.interests.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-800 cv-subtitle mb-3 border-b border-slate-200 pb-1">
            INTERESTS
          </h3>
          <ul className="list-disc list-inside cv-body text-slate-700 space-y-1 ml-4">
            {data.interests.map((interest: string, index: number) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  )
}

export default CVPreview
