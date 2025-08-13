
import React, { useState, useEffect } from 'react'
import { Plus, Minus, Save } from 'lucide-react'

interface CVEditFormProps {
  data: any
  onChange: (data: any) => void
}

const CVEditForm: React.FC<CVEditFormProps> = ({ data, onChange }) => {
  const [formData, setFormData] = useState(data || {})

  useEffect(() => {
    setFormData(data || {})
  }, [data])

  const handleChange = (section: string, field: string, value: any) => {
    const newData = {
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value
      }
    }
    setFormData(newData)
    onChange(newData)
  }

  const handleArrayChange = (section: string, index: number, field: string, value: any) => {
    const newArray = [...(formData[section] || [])]
    newArray[index] = {
      ...newArray[index],
      [field]: value
    }
    const newData = {
      ...formData,
      [section]: newArray
    }
    setFormData(newData)
    onChange(newData)
  }

  const addArrayItem = (section: string, template: any) => {
    const newArray = [...(formData[section] || []), template]
    const newData = {
      ...formData,
      [section]: newArray
    }
    setFormData(newData)
    onChange(newData)
  }

  const removeArrayItem = (section: string, index: number) => {
    const newArray = (formData[section] || []).filter((_: any, i: number) => i !== index)
    const newData = {
      ...formData,
      [section]: newArray
    }
    setFormData(newData)
    onChange(newData)
  }

  const handleResponsibilityChange = (expIndex: number, respIndex: number, value: string) => {
    const newExperience = [...(formData.experience || [])]
    const newResponsibilities = [...(newExperience[expIndex]?.responsibilities || [])]
    newResponsibilities[respIndex] = value
    newExperience[expIndex] = {
      ...newExperience[expIndex],
      responsibilities: newResponsibilities
    }
    const newData = {
      ...formData,
      experience: newExperience
    }
    setFormData(newData)
    onChange(newData)
  }

  const addResponsibility = (expIndex: number) => {
    const newExperience = [...(formData.experience || [])]
    const newResponsibilities = [...(newExperience[expIndex]?.responsibilities || []), '']
    newExperience[expIndex] = {
      ...newExperience[expIndex],
      responsibilities: newResponsibilities
    }
    const newData = {
      ...formData,
      experience: newExperience
    }
    setFormData(newData)
    onChange(newData)
  }

  const removeResponsibility = (expIndex: number, respIndex: number) => {
    const newExperience = [...(formData.experience || [])]
    const newResponsibilities = (newExperience[expIndex]?.responsibilities || []).filter((_: any, i: number) => i !== respIndex)
    newExperience[expIndex] = {
      ...newExperience[expIndex],
      responsibilities: newResponsibilities
    }
    const newData = {
      ...formData,
      experience: newExperience
    }
    setFormData(newData)
    onChange(newData)
  }

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-800 cv-subtitle">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 cv-caption mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.personalInfo?.name || ''}
              onChange={(e) => handleChange('personalInfo', 'name', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cv-body"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 cv-caption mb-1">
              Job Title
            </label>
            <input
              type="text"
              value={formData.personalInfo?.jobTitle || ''}
              onChange={(e) => handleChange('personalInfo', 'jobTitle', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cv-body"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 cv-caption mb-1">
              Nationality
            </label>
            <input
              type="text"
              value={formData.personalInfo?.nationality || ''}
              onChange={(e) => handleChange('personalInfo', 'nationality', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cv-body"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 cv-caption mb-1">
              Languages
            </label>
            <input
              type="text"
              value={formData.personalInfo?.languages || ''}
              onChange={(e) => handleChange('personalInfo', 'languages', e.target.value)}
              placeholder="e.g., English, French, Spanish"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cv-body"
            />
          </div>
        </div>
      </div>

      {/* Profile */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-800 cv-subtitle">Professional Profile</h3>
        <div>
          <label className="block text-sm font-medium text-slate-700 cv-caption mb-1">
            Profile Summary
          </label>
          <textarea
            value={formData.profile || ''}
            onChange={(e) => handleChange('', 'profile', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cv-body"
            placeholder="Brief professional summary highlighting key achievements and expertise..."
          />
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-800 cv-subtitle">Experience</h3>
          <button
            onClick={() => addArrayItem('experience', {
              company: '',
              position: '',
              startDate: '',
              endDate: '',
              responsibilities: ['']
            })}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 cv-body"
          >
            <Plus className="h-4 w-4" />
            <span>Add Experience</span>
          </button>
        </div>
        
        {(formData.experience || []).map((exp: any, expIndex: number) => (
          <div key={expIndex} className="p-4 border border-slate-200 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-slate-800 cv-body">Experience {expIndex + 1}</h4>
              <button
                onClick={() => removeArrayItem('experience', expIndex)}
                className="text-red-600 hover:text-red-700"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 cv-caption mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={exp.company || ''}
                  onChange={(e) => handleArrayChange('experience', expIndex, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cv-body"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 cv-caption mb-1">
                  Position
                </label>
                <input
                  type="text"
                  value={exp.position || ''}
                  onChange={(e) => handleArrayChange('experience', expIndex, 'position', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cv-body"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 cv-caption mb-1">
                  Start Date
                </label>
                <input
                  type="text"
                  value={exp.startDate || ''}
                  onChange={(e) => handleArrayChange('experience', expIndex, 'startDate', e.target.value)}
                  placeholder="Jan 2020"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cv-body"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 cv-caption mb-1">
                  End Date
                </label>
                <input
                  type="text"
                  value={exp.endDate || ''}
                  onChange={(e) => handleArrayChange('experience', expIndex, 'endDate', e.target.value)}
                  placeholder="Present or Dec 2023"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cv-body"
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700 cv-caption">
                  Responsibilities
                </label>
                <button
                  onClick={() => addResponsibility(expIndex)}
                  className="text-blue-600 hover:text-blue-700 text-sm cv-caption"
                >
                  Add Responsibility
                </button>
              </div>
              
              {(exp.responsibilities || []).map((resp: string, respIndex: number) => (
                <div key={respIndex} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => handleResponsibilityChange(expIndex, respIndex, e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cv-body"
                    placeholder="Responsibility or achievement..."
                  />
                  <button
                    onClick={() => removeResponsibility(expIndex, respIndex)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-800 cv-subtitle">Education</h3>
          <button
            onClick={() => addArrayItem('education', {
              degree: '',
              institution: '',
              graduationDate: ''
            })}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 cv-body"
          >
            <Plus className="h-4 w-4" />
            <span>Add Education</span>
          </button>
        </div>
        
        {(formData.education || []).map((edu: any, index: number) => (
          <div key={index} className="p-4 border border-slate-200 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-slate-800 cv-body">Education {index + 1}</h4>
              <button
                onClick={() => removeArrayItem('education', index)}
                className="text-red-600 hover:text-red-700"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 cv-caption mb-1">
                  Degree
                </label>
                <input
                  type="text"
                  value={edu.degree || ''}
                  onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cv-body"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 cv-caption mb-1">
                  Institution
                </label>
                <input
                  type="text"
                  value={edu.institution || ''}
                  onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cv-body"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 cv-caption mb-1">
                  Graduation Date
                </label>
                <input
                  type="text"
                  value={edu.graduationDate || ''}
                  onChange={(e) => handleArrayChange('education', index, 'graduationDate', e.target.value)}
                  placeholder="Dec 2020"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cv-body"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-800 cv-subtitle">Key Skills</h3>
        <div>
          <label className="block text-sm font-medium text-slate-700 cv-caption mb-1">
            Skills (one per line)
          </label>
          <textarea
            value={Array.isArray(formData.skills) ? formData.skills.join('\n') : (formData.skills || '')}
            onChange={(e) => handleChange('', 'skills', e.target.value.split('\n').filter(skill => skill.trim()))}
            rows={6}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cv-body"
            placeholder="JavaScript Programming&#10;Project Management&#10;Team Leadership&#10;Data Analysis"
          />
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-slate-800 cv-subtitle">Interests</h3>
        <div>
          <label className="block text-sm font-medium text-slate-700 cv-caption mb-1">
            Interests (one per line)
          </label>
          <textarea
            value={Array.isArray(formData.interests) ? formData.interests.join('\n') : (formData.interests || '')}
            onChange={(e) => handleChange('', 'interests', e.target.value.split('\n').filter(interest => interest.trim()))}
            rows={4}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cv-body"
            placeholder="Technology Innovation&#10;Photography&#10;Travel&#10;Fitness"
          />
        </div>
      </div>
    </div>
  )
}

export default CVEditForm
