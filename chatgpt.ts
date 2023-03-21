import fetch from "cross-fetch";
import {AuthToken} from "./types";

export const chatCompletion = async (
  prompt: string, bot: AuthToken
): Promise<string | undefined> => {
  const body = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: bot.promptStart + prompt + bot.promptEnd,
      },
    ],
  });

  let controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.API_KEY}`,
    },
    body,
    signal: controller.signal,
  });
  clearTimeout(timeoutId);

  if (!res.ok) throw Error(res.statusText);

  const data: any = await res.json();
  const choice = 0;

  controller = new AbortController();
  return data.choices[choice].message;
};

