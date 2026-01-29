import { useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker - using jsdelivr CDN with correct version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

const PDFUploader = ({ onTextExtracted }) => {
  const fileInputRef = useRef(null);
  const [inputMode, setInputMode] = useState('pdf'); // 'pdf' or 'text'
  const [pastedText, setPastedText] = useState('');

  const extractTextFromPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let fullText = '';

      // Extract text from all pages
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + ' ';
      }

      // Parse into words, filtering out empty strings
      const words = fullText
        .split(/\s+/)
        .filter(word => word.trim().length > 0);

      onTextExtracted(words, file.name);
    } catch (error) {
      console.error('Error extracting PDF text:', error);
      alert('Failed to extract text from PDF. Please try another file.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      extractTextFromPDF(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleTextSubmit = () => {
    if (!pastedText.trim()) {
      alert('Please paste some text first.');
      return;
    }

    // Parse into words, filtering out empty strings
    const words = pastedText
      .split(/\s+/)
      .filter(word => word.trim().length > 0);

    if (words.length === 0) {
      alert('No readable text found. Please paste some text.');
      return;
    }

    // Generate a name from first few words
    const previewWords = words.slice(0, 4).join(' ');
    const name = previewWords.length > 30
      ? previewWords.slice(0, 30) + '...'
      : previewWords + '...';

    onTextExtracted(words, name);
  };

  return (
    <div className="pdf-uploader">
      {/* Mode Toggle */}
      <div className="input-mode-toggle">
        <button
          className={`mode-btn ${inputMode === 'pdf' ? 'active' : ''}`}
          onClick={() => setInputMode('pdf')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          PDF
        </button>
        <button
          className={`mode-btn ${inputMode === 'text' ? 'active' : ''}`}
          onClick={() => setInputMode('text')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
          Paste Text
        </button>
      </div>

      {inputMode === 'pdf' ? (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="pdf-upload"
          />
          <label htmlFor="pdf-upload" className="upload-button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Upload PDF
          </label>
        </>
      ) : (
        <div className="text-input-container">
          <textarea
            className="text-input"
            placeholder="Paste your text here..."
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            rows={8}
          />
          <button
            className="start-reading-btn"
            onClick={handleTextSubmit}
            disabled={!pastedText.trim()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Start Reading
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
