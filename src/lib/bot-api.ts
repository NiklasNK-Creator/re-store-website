const BOT_URL = process.env.BOT_URL || "http://localhost:3001";
const BOT_API_TOKEN = process.env.BOT_API_TOKEN || "";

export async function botApi(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BOT_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Bot-Token": BOT_API_TOKEN,
      ...options.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Bot API ${path} → ${res.status} ${text}`);
  }
  return res.json();
}
