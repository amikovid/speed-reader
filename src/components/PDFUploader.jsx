import { useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker - using jsdelivr CDN with correct version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

const PDFUploader = ({ onTextExtracted }) => {
  const fileInputRef = useRef(null);

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

  return (
    <div className="pdf-uploader">
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
    </div>
  );
};

export default PDFUploader;
