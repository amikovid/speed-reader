import { useState } from 'react';
import PDFUploader from './components/PDFUploader';
import SpeedReader from './components/SpeedReader';
import './App.css';

function App() {
  const [words, setWords] = useState([]);
  const [fileName, setFileName] = useState('');

  const handleTextExtracted = (extractedWords, name) => {
    setWords(extractedWords);
    setFileName(name);
  };

  const handleNewUpload = () => {
    setWords([]);
    setFileName('');
  };

  return (
    <div className="app">
      {words.length === 0 ? (
        <div className="welcome-screen">
          <div className="welcome-content">
            <h1 className="app-title">Speed Reader</h1>
            <p className="app-subtitle">
              Upload a PDF or paste text to start speed reading with RSVP technology
            </p>
            <PDFUploader onTextExtracted={handleTextExtracted} />
            <div className="features">
              <div className="feature">
                <span className="feature-icon">⚡</span>
                <span>300-900 WPM</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🎯</span>
                <span>ORP Highlighting</span>
              </div>
              <div className="feature">
                <span className="feature-icon">💾</span>
                <span>Auto-save Progress</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="reader-screen">
          <div className="reader-header">
            <button onClick={handleNewUpload} className="new-file-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              New File
            </button>
          </div>
          <SpeedReader words={words} fileName={fileName} />
        </div>
      )}
    </div>
  );
}

export default App;
