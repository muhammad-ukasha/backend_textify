// 📁 server.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const wav = require("wav");
const http = require("http");
const WebSocket = require("ws");
const Routes = require("./router/index");
// const { handleTranscriptionConnection, broadcastTranscription } = require('./controller/transcriptionController');
const path = require("path");
// const cors = require('cors');
// app.use(cors());

dotenv.config();
const app = express();
const server = http.createServer(app);
// const wss = new WebSocket.Server({ server, path: "/audio" });
// const transcriptionWss = new WebSocket.Server({ server, path: "/transcription" });

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// 🌐 Middleware
app.use(cors());
app.use(express.json());
app.use(Routes);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// 🔗 MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log(`❌ DB Connection Error: ${err}`));

// 🎙️ WebSocket Audio Handling
// wss.on('connection', function connection(ws) {
//   console.log('🎧 ESP32 connected via WebSocket');

//   const fileName = `audio_${Date.now()}.wav`;
//   const fileStream = fs.createWriteStream(fileName);
//   const wavWriter = new wav.Writer({
//     channels: 1,
//     sampleRate: 8000,
//     bitDepth: 16,
//   });

//   wavWriter.pipe(fileStream);

//   ws.on('message', function incoming(data) {
//     wavWriter.write(data);
//     // Here you would process the audio data and get transcription
//     // For example, using AWS Transcribe or any other service
//     // Then broadcast the transcription
//     // broadcastTranscription(transcriptionText);
//   });

//   ws.on('close', () => {
//     wavWriter.end();
//     console.log(`📁 Audio saved as ${fileName}`);
//   });
// });

// 📝 Transcription WebSocket Handling
// transcriptionWss.on('connection', handleTranscriptionConnection);

// 🚀 Start HTTP + WebSocket Server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  // console.log(`🔊 WebSocket listening at ws://localhost:${PORT}`);
});
