import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function slugify(s: string) {
  const base = (s || "untitled")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
  return base || "untitled"
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

    const title = typeof body?.title === "string" ? body.title : "Untitled"
    const tldr = body?.customInstructions?.tldr ?? ""
    const models = Array.isArray(body?.models) ? body.models : []

    const article = {
      title,
      slug: slugify(title),
      description: tldr || "Generated article",
      hero: { headline: title, subheadline: tldr, brand: { primary: "#3b82f6", secondary: "#10b981" } },
      toc: [],
      blocks: [
        { type: "intro", html: `<p>${tldr || "No TLDR provided."}</p>` },
        ...(models.length
          ? [{
              type: "comparisonTable" as const,
              caption: "Models",
              columns: ["Model", "HP", "MPG", "Price"],
              rows: models.map((m: any) => ({
                label: m?.name ?? "",
                values: String([m?.hp ?? "", m?.mpg ?? "", m?.price ?? ""].join(" | ")),
              })),
              highlightRule: "max" as const,
            }]
          : []),
      ],
      ctas: [],
    }

    return NextResponse.json({ article }, { headers: { "cache-control": "no-store" } })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Server error" }, { status: 500 })
  }
}

// Optional: make GET explicit (UI uses POST; GET will return 405 JSON instead of HTML)
export async function GET() {
  return NextResponse.json({ error: "Use POST" }, { status: 405 })
}
