export async function fetchJson(input: RequestInfo | URL, init?: RequestInit) {
  const res = await fetch(input, init);
  const text = await res.text();
  if (!res.ok) {
    console.error("HTTP error:", res.status, text.slice(0, 1000));
    throw new Error(`HTTP ${res.status}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    console.error("Non-JSON payload (first 1k chars):", text.slice(0, 1000));
    throw new Error("Bad JSON from server");
  }
}
