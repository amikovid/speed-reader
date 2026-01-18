import { useState, useEffect, useCallback } from 'react';
import Controls from './Controls';

const SpeedReader = ({ words, fileName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wpm, setWpm] = useState(500);

  // Load saved state from localStorage
  useEffect(() => {
    const savedWpm = localStorage.getItem('speedreader_wpm');
    const savedPosition = localStorage.getItem('speedreader_position');
    const savedFileName = localStorage.getItem('speedreader_filename');

    if (savedWpm) setWpm(Number(savedWpm));

    // Only restore position if it's the same file
    if (savedFileName === fileName && savedPosition) {
      setCurrentIndex(Number(savedPosition));
    } else {
      setCurrentIndex(0);
    }

    // Save current file name
    localStorage.setItem('speedreader_filename', fileName);
  }, [fileName]);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('speedreader_wpm', wpm);
    localStorage.setItem('speedreader_position', currentIndex);
  }, [wpm, currentIndex]);

  // Calculate ORP (Optimal Recognition Point)
  const getORPIndex = (word) => {
    if (word.length <= 1) return 0;
    if (word.length <= 5) return 1;
    if (word.length <= 9) return 2;
    if (word.length <= 13) return 3;
    return 4;
  };

  // Calculate delay based on word characteristics
  const getWordDelay = useCallback((word) => {
    let baseDelay = 60000 / wpm; // Base delay in milliseconds

    // Longer words get more time
    if (word.length >= 8) {
      baseDelay *= 1.15;
    }

    // Add pause for punctuation
    if (word.endsWith('.') || word.endsWith('!') || word.endsWith('?')) {
      baseDelay += 200;
    } else if (word.endsWith(',') || word.endsWith(';') || word.endsWith(':')) {
      baseDelay += 100;
    }

    return baseDelay;
  }, [wpm]);

  // Main reading loop
  useEffect(() => {
    if (!isPlaying || currentIndex >= words.length) {
      if (currentIndex >= words.length) {
        setIsPlaying(false);
      }
      return;
    }

    const currentWord = words[currentIndex];
    const delay = getWordDelay(currentWord);

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex, words, getWordDelay]);

  const handlePlayPause = () => {
    if (currentIndex >= words.length) {
      setCurrentIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const handleWpmChange = (newWpm) => {
    setWpm(newWpm);
  };

  const currentWord = words[currentIndex] || '';
  const orpIndex = getORPIndex(currentWord);
  const progress = (currentIndex / words.length) * 100;

  // Split word into parts for ORP highlighting
  const beforeORP = currentWord.slice(0, orpIndex);
  const orpLetter = currentWord[orpIndex] || '';
  const afterORP = currentWord.slice(orpIndex + 1);

  return (
    <div className="speed-reader">
      {/* Main Display Area */}
      <div className="reader-display">
        <div className="word-container">
          <div className="word">
            <span className="word-before">{beforeORP}</span>
            <span className="word-orp">{orpLetter}</span>
            <span className="word-after">{afterORP}</span>
          </div>
        </div>

        {/* File Name */}
        <div className="file-name">{fileName}</div>

        {/* WPM Display in bottom right */}
        <div className="wpm-display">{wpm} WPM</div>
      </div>

      {/* Controls */}
      <Controls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onRestart={handleRestart}
        wpm={wpm}
        onWpmChange={handleWpmChange}
        currentWord={currentIndex + 1}
        totalWords={words.length}
        progress={progress}
      />
    </div>
  );
};

export default SpeedReader;
