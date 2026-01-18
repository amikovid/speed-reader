const Controls = ({
  isPlaying,
  onPlayPause,
  onRestart,
  wpm,
  onWpmChange,
  currentWord,
  totalWords,
  progress,
}) => {
  return (
    <div className="controls">
      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
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
