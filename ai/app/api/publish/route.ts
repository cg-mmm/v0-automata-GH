import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function safeSlug(a: any) {
  const s = a?.slug || a?.title || "untitled"
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "untitled"
}

export async function POST(req: Request) {
  try {
    let body: any = {}
    try {
      body = await req.json()
    } catch {
      const text = await req.text()
      body = text ? JSON.parse(text) : {}
    }

    const slug = safeSlug(body?.article ?? {})
    // In a real app you’d persist here; we just return a URL so the UI can proceed.
    return NextResponse.json({ url: `/articles/${slug}` }, { headers: { "cache-control": "no-store" } })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Server error" }, { status: 500 })
  }
}

// Optional GET -> 405 JSON
export async function GET() {
  return NextResponse.json({ error: "Use POST" }, { status: 405 })
}
