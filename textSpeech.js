import voice from "elevenlabs-node";
import fs from "fs";

const apiKey = process.env.XI_API_KEY; // Your API key from Elevenlabs
const voiceID = "pNInz6obpgDQGcFmaJgB"; // The ID of the voice you want to get
const fileName = "audio.mp3"; // The name of your audio file
const textInput = "Yane! Yakake? Ya yau? Ya jindadi?"; // The text you wish to convert to speech

voice.textToSpeechStream(apiKey, voiceID, textInput).then((res) => {
  res.pipe(fs.createWriteStream(fileName));
});
