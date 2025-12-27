import axios from "axios";
import { env } from "../../config/env.js";

export async function analyzeWithAI({ codeInput, detectedIssues }) {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "mistralai/mistral-7b-instruct",
      messages: [
        {
          role: "system",
          content:
            "You are a backend code reviewer. Respond only in valid JSON.",
        },
        {
          role: "user",
          content: JSON.stringify({
            code: codeInput,
            detectedIssues,
          }),
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
    }
  );

  console.log(response.headers);

  return JSON.parse(response.data.choices[0].message.content);
}
