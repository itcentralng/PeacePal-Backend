// const express = require("express");
import express from "express";
// const textToSpeech = require("./textSpeech");
import textToSpeech from "./textSpeech.js";
import { configDotenv } from "dotenv";

configDotenv();
const app = express();
const port = 3000;

app.post("/convert-text-to-speech", async (req, res) => {
  const text = req.body.text;
  const response = textToSpeech(text);
  const audioBuffer = await response;
  res.setHeader("Content-Type", "audio/mpeg");
  res.send(audioBuffer);
});

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await textToSpeech();
});
