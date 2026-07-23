import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

const ABUSIVE_WORDS = [
  "nigger",
  "faggot",
  "retard",
  "kill yourself",
  "kys",
  "cunt",
  "slut",
  "whore",
  "bitch",
  "fuck you",
];

app.post("/api/roast", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Input prompt is required." });
    }

    const trimmed = prompt.trim();

    if (trimmed.length === 0) {
      return res.json({
        response: "Let's keep it friendly — try typing something about yourself!",
      });
    }

    if (trimmed.length > 200) {
      return res.status(400).json({
        error: "Submission exceeds maximum length of 200 characters.",
      });
    }

    const lower = trimmed.toLowerCase();
    const isAbusive = ABUSIVE_WORDS.some((word) => lower.includes(word));

    if (isAbusive) {
      return res.json({
        response: "Let's keep it friendly — try something else!",
      });
    }

    let ai: GoogleGenAI;
    try {
      ai = getGeminiClient();
    } catch {
      return res.json({
        response:
          "I appreciate the enthusiasm! I'm taking a quick break from AI roasting right now. Anyway, say hi properly below →",
      });
    }

    const systemInstruction =
      "You are a witty, dry-humored UX designer named Anisha. Given whatever the visitor typed, respond with a short (1-2 sentence), playful, either complimentary or gently teasing reaction — keep it light, never mean-spirited, PG-rated, and end with a natural transition inviting them to reach out (e.g. 'Anyway, say hi properly →' or 'Anyway, feel free to drop me an email below →').";

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: trimmed,
      config: {
        systemInstruction,
        temperature: 0.85,
      },
    });

    const reply =
      response.text?.trim() ||
      "Solid submission! Though my design instinct says you're keeping your best stories hidden. Anyway, say hi properly below →";

    return res.json({ response: reply });
  } catch (error) {
    console.error("Error in /api/roast:", error);
    return res.json({
      response:
        "That submission was so unique it broke my prompt generator! Anyway, say hi properly below →",
    });
  }
});

app.post("/api/note", async (req, res) => {
  try {
    const { dayOfYear, weatherText, timeOfDay } = req.body || {};

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = dayOfYear || Math.floor(diff / oneDay);
    const weather = weatherText || "72°F and breezy";
    const tod = timeOfDay || "afternoon";

    let ai: GoogleGenAI;
    try {
      ai = getGeminiClient();
    } catch {
      return res.json({
        fallback: true,
        note: `Thanks for making it all the way down here on Day ${day} of 2026. It's currently ${weather} in Chicago, and I'm likely tweaking grid systems or reviewing user testing notes. If you'd like to collaborate or just say hello, drop me a message below.`,
      });
    }

    const systemInstruction =
      "You are Anisha, a UX designer and researcher, writing a short (2-3 sentence), warm but dry-witted personal note to someone who just scrolled to the bottom of your portfolio. Reference the current date (Day [X] of 2026), the current Chicago weather ([fetched condition/temp]), and/or time of day naturally and briefly. End with a light, inviting line toward getting in touch. Keep the tone confident, a little funny, never sappy or generic.";

    const userPrompt = `Context: Today is Day ${day} of 2026. Time of day: ${tod}. Current Chicago weather: ${weather}. Write a short 2-3 sentence note for the portfolio visitor.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    const noteText = response.text?.trim();
    if (!noteText) {
      throw new Error("Empty response from Gemini");
    }

    return res.json({ note: noteText });
  } catch (error) {
    console.error("Error in /api/note:", error);
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const day = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    return res.json({
      fallback: true,
      note: `Thanks for making it all the way down here on Day ${day} of 2026. It's a fine day in Chicago, and I'm currently refining user flows and interaction details. If you'd like to collaborate or chat, feel free to reach out below.`,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
