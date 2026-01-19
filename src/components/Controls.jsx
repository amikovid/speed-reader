import { useState, useRef } from 'react';

const Controls = ({
  isPlaying,
  onPlayPause,
  onRestart,
  wpm,
  onWpmChange,
  currentWord,
  totalWords,
  progress,
  words,
  onProgressJump,
}) => {
  const [tooltip, setTooltip] = useState({ visible: false, word: '', wordIndex: 0, position: 0 });
  const progressBarRef = useRef(null);

  const handleProgressClick = (e) => {
    if (!progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    const wordIndex = Math.floor((percentage / 100) * totalWords);

    if (onProgressJump) {
      onProgressJump(Math.max(0, Math.min(wordIndex, totalWords - 1)));
    }
  };

  const handleProgressHover = (e) => {
    if (!progressBarRef.current || !words) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const hoverX = e.clientX - rect.left;
    const percentage = (hoverX / rect.width) * 100;
    const wordIndex = Math.floor((percentage / 100) * totalWords);

    if (wordIndex >= 0 && wordIndex < words.length) {
      setTooltip({
        visible: true,
        word: words[wordIndex],
        wordIndex: wordIndex,
        position: percentage,
      });
    }
  };

  const handleProgressLeave = () => {
    setTooltip({ visible: false, word: '', wordIndex: 0, position: 0 });
  };

  return (
    <div className="controls">
      {/* Progress Bar */}
      <div
        className="progress-bar-container"
        ref={progressBarRef}
        onClick={handleProgressClick}
        onMouseMove={handleProgressHover}
        onMouseLeave={handleProgressLeave}
      >
        <div className="progress-bar" style={{ width: `${progress}%` }} />
        {tooltip.visible && (
          <div
            className="progress-tooltip"
            style={{ left: `${tooltip.position}%` }}
          >
            <div className="tooltip-word">{tooltip.word}</div>
            <div className="tooltip-position">
              Word {tooltip.wordIndex + 1} of {totalWords}
            </div>
          </div>
        )}
      </div>

      {/* Word Counter */}
      <div className="word-counter">
        Word {currentWord} of {totalWords}
      </div>

      {/* Control Buttons */}
      <div className="control-buttons">
        <button onClick={onRestart} className="control-btn restart-btn" title="Restart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </button>

        <button onClick={onPlayPause} className="control-btn play-pause-btn">
          {isPlaying ? (
            // Pause Icon
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            // Play Icon
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
      </div>

      {/* Speed Slider */}
      <div className="speed-control">
        <label htmlFor="wpm-slider">Speed: {wpm} WPM</label>
        <input
          id="wpm-slider"
          type="range"
          min="300"
          max="900"
          value={wpm}
          onChange={(e) => onWpmChange(Number(e.target.value))}
          className="wpm-slider"
        />
        <div className="speed-markers">
          <span>300</span>
          <span>600</span>
          <span>900</span>
        </div>
      </div>
    </div>
  );
};

export default Controls;
