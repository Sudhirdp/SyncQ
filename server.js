const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Set up storage for video uploads
const videoStorage = multer.memoryStorage();
const videoUpload = multer({ storage: videoStorage });

// Set up storage for subtitles uploads
const subtitlesStorage = multer.memoryStorage();
const subtitlesUpload = multer({ storage: subtitlesStorage });

// In-memory storage for video and subtitles data
const videoData = {};
const subtitlesData = {};

// API endpoint to handle video upload
app.post('/api/upload/video', videoUpload.single('video'), (req, res) => {
    const videoFile = req.file;
    const videoId = Date.now().toString();

    if (!videoFile) {
        return res.status(400).json({ error: 'No video file provided.' });
    }

    videoData[videoId] = videoFile.buffer;

    return res.json({ videoId });
});

// API endpoint to handle subtitles creation
app.post('/api/upload/subtitles/:videoId', subtitlesUpload.single('subtitles'), (req, res) => {
    const videoId = req.params.videoId;
    const subtitlesFile = req.file;

    if (!subtitlesFile) {
        return res.status(400).json({ error: 'No subtitles file provided.' });
    }

    const vttContent = subtitlesFile.buffer.toString();
    subtitlesData[videoId] = vttContent;

    return res.json({ success: true });
});

// API endpoint to retrieve subtitles file
app.get('/api/subtitles/:videoId', (req, res) => {
    const videoId = req.params.videoId;
    const subtitlesContent = subtitlesData[videoId];

    if (!subtitlesContent) {
        return res.status(404).json({ error: 'Subtitles not found for the specified video.' });
    }

    res.setHeader('Content-Type', 'text/vtt');
    res.send(subtitlesContent);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});