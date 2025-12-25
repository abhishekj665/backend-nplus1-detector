import axios from "axios";
import { env } from "../config/env.js";

export async function analyzeCodeWithAI(code) {
  if (!code || typeof code !== "string") {
    return { success: false, error: "Invalid code input", data: null };
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content:
              "You are a backend code optimizer. Respond only with valid JSON.",
          },
          {
            role: "user",
            content: code,
          },
        ],
        temperature: 0.1,
        response_format: { type: "json_object" },
      },
      {
        headers: {
          Authorization: `Bearer ${env.llm_api_key}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    const raw = response?.data?.choices?.[0]?.message?.content;

    if (!raw) {
      return {
        success: false,
        error: "Empty AI response",
        data: null,
      };
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return {
        success: false,
        error: "AI returned malformed JSON",
        data: null,
      };
    }

    return {
      success: true,
      data: parsed,
    };
  } catch (error) {
    return {
      success: false,
      error: "AI response failed",
      data: null,
    };
  }
}
