# Speed Reader - RSVP Speed Reading App

A professional speed reading web application built with React and Vite that uses RSVP (Rapid Serial Visual Presentation) technology to help you read faster.

## Features

- **PDF Upload**: Upload any PDF file and extract text for speed reading
- **RSVP Technology**: Display one word at a time for optimal reading speed
- **ORP Highlighting**: Optimal Recognition Point highlighted in red for better focus
- **Adjustable Speed**: 300-900 WPM range with smooth slider control
- **Smart Reading**:
  - Longer words get more display time (+15% for 8+ letter words)
  - Automatic pauses at punctuation (periods: +200ms, commas: +100ms)
- **Progress Tracking**: Visual progress bar and word counter
- **Auto-save**: Automatically saves your position and preferred WPM
- **Clean Dark UI**: Distraction-free reading experience
- **Fully Responsive**: Works on desktop, tablet, and mobile devices

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. Click "Upload PDF" on the welcome screen
2. Select a PDF file from your computer
3. Use the play/pause button to control reading
4. Adjust speed with the WPM slider (300-900 WPM)
5. Click restart to go back to the beginning
6. Your progress and speed preference are automatically saved

## Technology Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **PDF.js** - PDF text extraction
- **LocalStorage** - Progress persistence

## How RSVP Works

RSVP (Rapid Serial Visual Presentation) displays words one at a time in a fixed location, eliminating eye movement and allowing faster reading speeds. The Optimal Recognition Point (ORP) is highlighted to help your eyes focus on the most important part of each word.

## Formula

- Base delay per word: `60000 / WPM` milliseconds
- Longer words: +15% time for words with 8+ letters
- Punctuation pauses: +200ms for periods, +100ms for commas

## License

MIT
