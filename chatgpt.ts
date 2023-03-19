import fetch from "cross-fetch";

const startPrompt = process.env.SECRET_PROMPT_START ?? "";
const endPrompt = process.env.SECRET_PROMPT_END ?? "";
const controller = new AbortController();

export const chatCompletion = async (
  message: string
): Promise<string | undefined> => {
  const body = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: startPrompt + message + endPrompt,
      },
    ],
  });

  const timeoutId = setTimeout(() => controller.abort(), 15000);
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

  return data.choices[choice].message;
};

