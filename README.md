# 🤖 AI-Powered CV Builder

A modern web application that transforms raw, unstructured CVs into professional documents using AI and cutting-edge web technologies. Upload your CV in various formats and let AI intelligently format it according to professional standards.

> Live Website -- [Click Here](https://ai-cv-builder-two.vercel.app/)


## Features

### Core Functionality
- **Multi-Format Support**: Upload CVs in PDF, DOCX, XLS, and XLSX formats
- **AI-Powered Processing**: Intelligent content extraction and formatting using multiple AI models (GPT-4, Claude, Gemini)
- **Real-Time Processing**: Live status updates with detailed progress tracking
- **Inline Editing**: Side-by-side preview with instant editing capabilities
- **Professional Formatting**: Automatic application of EHS formatting standards

### Technical Highlights
- **Modern Tech Stack**: Built with React 18, TypeScript, and Vite
- **Database Integration**: MongoDB with structured schemas for CV documents and processing jobs
- **Responsive Design**: Professional UI with Tailwind CSS and custom styling
- **Error Handling**: Comprehensive error recovery and user feedback
- **File Processing**: Robust parsing for multiple document formats
- **Real-Time Updates**: Automatic data refresh without manual intervention

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Hot Toast** for notifications

### Backend & Database
- **MongoDB** with structured schemas
- **Lumi SDK** for database operations
- **Express.js** for API endpoints
- **File Processing Libraries**: Mammoth, PDF-Parse, XLSX

### AI Integration
- **OpenAI GPT-4** for content analysis
- **Anthropic Claude** for text processing
- **Google Gemini** for additional AI capabilities
- **Fallback System** with comprehensive logging

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB database
- AI API keys (OpenAI, Anthropic, Google)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-cv-formatter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file with your API keys:
   ```env
   OPENAI_API_KEY=your_openai_key
   ANTHROPIC_API_KEY=your_anthropic_key
   GOOGLE_AI_API_KEY=your_google_key
   MONGODB_URI=your_mongodb_connection
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage Guide

### Uploading a CV

1. **Navigate to CV Processor**
   - Click "Process New CV" from the dashboard
   - Or go directly to the processor page

2. **Upload Your File**
   - Drag and drop your CV file
   - Or click to browse and select
   - Supported formats: PDF, DOCX, XLS, XLSX

3. **Monitor Processing**
   - Real-time status updates show progress
   - AI models process your content automatically
   - Error handling provides clear feedback

### Editing Your CV

1. **Access the Editor**
   - Click "Edit" on any processed CV
   - Or navigate from the processing completion

2. **Side-by-Side Editing**
   - Left panel: Editable form fields
   - Right panel: Live preview
   - Changes update instantly

3. **Professional Formatting**
   - Automatic section ordering
   - Palatino Linotype font application
   - EHS formatting standards

### Managing CVs

1. **Dashboard Overview**
   - View all recent CVs
   - Quick access to editing
   - Processing status indicators

2. **Data Persistence**
   - All CVs saved automatically
   - MongoDB ensures data integrity
   - No manual refresh needed

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Code linting
npm run lint

# Preview production build
npm run preview
```

### Key Components

#### Data Management
- **useCVData**: Handles CV CRUD operations
- **useCVProcessing**: Manages file processing workflow
- **MongoDB Schemas**: Structured data validation

#### UI Components
- **CVEditForm**: Inline editing with validation
- **CVPreview**: Professional CV display
- **ProcessingStatus**: Real-time progress tracking

#### AI Integration
- **Multi-Model Support**: GPT-4, Claude, Gemini
- **Fallback System**: Ensures processing reliability
- **Error Recovery**: Comprehensive error handling

## Design Principles

### Professional Standards
- **Typography**: Palatino Linotype for professional appearance
- **Layout**: Consistent spacing and alignment
- **Responsive**: Works across all device sizes
- **Accessibility**: WCAG 2.1 AA compliance

### User Experience
- **Intuitive Navigation**: Clear workflow progression
- **Real-Time Feedback**: Immediate status updates
- **Error Handling**: Clear, actionable error messages
- **Performance**: Fast loading and processing

## Security & Privacy

- **File Processing**: Secure handling of uploaded documents
- **Data Storage**: Encrypted MongoDB storage
- **API Security**: Protected AI service integration
- **Error Logging**: Comprehensive without exposing sensitive data

## Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Ensure all required environment variables are set:
- AI API keys for processing
- MongoDB connection string
- Any additional service configurations

### Performance Optimization
- Vite optimizes bundle size automatically
- Lazy loading for better initial load times
- Efficient MongoDB queries
- AI request optimization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
1. Check the existing issues on GitHub
2. Create a new issue with detailed description
3. Include error logs and reproduction steps



