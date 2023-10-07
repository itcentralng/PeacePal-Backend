import axios from "axios";
import fs from "fs";
import PromptSync from "prompt-sync";
import chatBot from "./AI.js";

const CHUNK_SIZE = 1024;
const url = "https://api.elevenlabs.io/v1/text-to-speech/CYw3kZ02Hs0563khs1Fj";

const headers = {
  Accept: "audio/mpeg",
  "Content-Type": "application/json",
  "xi-api-key": process.env.XI_API_KEY,
};

const prompt = PromptSync();
const response = prompt("You: ");

const data = {
  text: `${chatBot(response)}`,
  model_id: "eleven_monolingual_v1",
  voice_settings: {
    stability: 0.5,
    similarity_boost: 0.5,
    style: 0.5,
  },
};

axios
  .post(url, data, {
    headers: headers,
    responseType: "stream", // Tell Axios to handle the response as a stream
  })
  .then((response) => {
    const writer = fs.createWriteStream("output.mp3");

    response.data.on("data", (chunk) => {
      writer.write(chunk);
    });

    response.data.on("end", () => {
      writer.end();
      console.log("File saved as output.mp3");
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
