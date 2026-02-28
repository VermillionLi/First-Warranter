import {config} from "dotenv";
config();
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import {HOME_WARRANTY_PROMPT} from './prompt.js'

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY


// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI(GEMINI_API_KEY);

async function template() {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Explain how AI works in a few words",
        thinking_budget: "1025"
    });
    console.log(response.text);
    return response
}



const base64ImageFile = fs.readFileSync("sampleImg.png", {
    encoding: "base64",
});

const contents = [
    {
        inlineData: {
            mimeType: "image/jpeg",
            data: base64ImageFile,
        },
    },
    { text: HOME_WARRANTY_PROMPT },
];
//TODO: Turn this into a function that takes in base64
async function testImage() {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
    });
    console.log(response.text);
    return response
}


export {template, testImage};