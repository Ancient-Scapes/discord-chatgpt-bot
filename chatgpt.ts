import fetch from "cross-fetch";

export const chatCompletion = async (
  message: string
): Promise<string | undefined> => {
  const body = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: process.env.SECRET_PROMPT_FRONT + message,
      },
    ],
  });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.API_KEY}`,
    },
    body,
  });

  const data: any = await res.json();
  console.log(data.choices[0].message);
  const choice = 0;

  return data.choices[choice].message.content;
};

