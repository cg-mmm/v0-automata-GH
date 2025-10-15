import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

type TOCItem = { id: string; label: string }
type TableRow = { label: string; values: string }
type SpecItem = { label: string; value: string }
type SpecGroup = { title: string; items: SpecItem[] }
type FAQItem  = { q: string; a: string }

type Hero = {
  eyebrow?: string
  headline: string
  subheadline?: string
  image?: { url: string; alt?: string }
  badges?: { label: string }[]
  cta?: { label: string; href: string }
}

type Article = {
  title: string
  slug: string
  description: string
  hero?: Hero
  toc: TOCItem[]
  blocks: (
    | { type: "intro"; html: string }                                              // index 0
    | { type: "comparisonTable"; caption?: string; columns: string[]; rows: TableRow[]; highlightRule?: "max"|"min" } // 1
    | { type: "specGrid"; groups: SpecGroup[] }                                     // 2
    | { type: "prosCons"; pros: string[]; cons: string[] }                          // 3
    | { type: "markdown"; md: string }                                              // 4
    | { type: "ctaBanner"; heading: string; label: string; href: string }           // 5 (heading REQUIRED)
    | { type: "faq"; heading: string; items: FAQItem[] }                            // 6
  )[]
  ctas?: { label: string; href: string }[]
}

function slugify(s: string) {
  return (s||"")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const topic = searchParams.get("topic") || "2026 Midsize Sedan Comparison"
    const slug  = slugify(topic)

    const article: Article = {
      title: topic,
      slug,
      description: "Auto-generated preview (fallback)",
      hero: {
        eyebrow: "Vehicle Intelligence Report",
        headline: topic,
        subheadline: "Honda Accord vs Toyota Camry vs Mazda6 - Which sedan offers the best value?",
        image: { url: "/2026-midsize-sedan-comparison.jpg", alt: "2026 Midsize Sedans" },
        badges: [{ label: "Updated 2026" }, { label: "Expert Analysis" }, { label: "164+ Data Points" }],
        cta: { label: "Get Pricing", href: "#pricing" },
      },
      toc: [
        { id: "overview",      label: "Overview" },
        { id: "performance",   label: "Performance" },
        { id: "fuel-economy",  label: "Fuel Economy" },
        { id: "specs",         label: "Specifications" },
        { id: "pros-cons",     label: "Pros & Cons" },
        { id: "faq",           label: "FAQ" },
      ],
      blocks: [
        { type: "intro", html: `<p>Quick overview for <strong>${topic}</strong>.</p>` }, // 0
        { // 1
          type: "comparisonTable",
          caption: "Key Specifications Comparison",
          columns: ["Metric","Honda Accord","Toyota Camry","Mazda6"],
          rows: [
            { label: "Starting Price", values: "$27,950 | $27,950 | $26,950" },
            { label: "Horsepower",     values: "192 hp | 203 hp | 187 hp" },
            { label: "City MPG",       values: "30 | 28 | 26" },
            { label: "Highway MPG",    values: "38 | 39 | 35" },
            { label: "Cargo Space",    values: "16.7 cu ft | 15.1 cu ft | 14.7 cu ft" },
            { label: "Warranty",       values: "3yr/36k mi | 3yr/36k mi | 3yr/36k mi" },
          ],
          highlightRule: "max",
        },
        { // 2
          type: "specGrid",
          groups: [
            { title: "Performance", items: [
              { label: "Engine",       value: "2.5L 4-Cylinder" },
              { label: "Horsepower",   value: "192 hp @ 6,500 rpm" },
              { label: "Torque",       value: "192 lb-ft @ 3,500 rpm" },
              { label: "Transmission", value: "CVT Automatic" },
              { label: "0-60 mph",     value: "7.8 seconds" },
            ]},
            { title: "Fuel Economy", items: [
              { label: "City",      value: "30 MPG" },
              { label: "Highway",   value: "38 MPG" },
              { label: "Combined",  value: "33 MPG" },
              { label: "Fuel Tank", value: "14.8 gallons" },
              { label: "Range",     value: "488 miles" },
            ]},
            { title: "Dimensions", items: [
              { label: "Length",      value: "192.2 inches" },
              { label: "Width",       value: "73.3 inches" },
              { label: "Height",      value: "57.1 inches" },
              { label: "Wheelbase",   value: "111.4 inches" },
              { label: "Curb Weight", value: "3,131 lbs" },
            ]},
          ],
        },
        { // 3
          type: "prosCons",
          pros: [
            "Excellent fuel economy across all models",
            "Spacious and comfortable interiors",
            "Strong reliability ratings and resale value",
            "Advanced safety features standard",
            "Smooth and refined ride quality",
          ],
          cons: [
            "CVT transmissions may feel less engaging",
            "Base models lack some premium features",
            "Styling may be too conservative for some",
            "Infotainment systems can be complex",
          ],
        },
        { // 4
          type: "markdown",
          md: [
            "### Expert Reviews",
            "",
            "- **Car and Driver**: Top pick for balance of space, efficiency, and driving enjoyment.",
            "- **Motor Trend**: Camry’s reliability and available AWD stand out.",
            "- **Edmunds**: Mazda6 brings premium feel and dynamics at a value price.",
          ].join("\n"),
        },
        { // 5
          type: "ctaBanner",
          heading: "Ready to Find Your Perfect Sedan?",
          label: "Get Free Quote",
          href: "/get-quote",
        },
        { // 6
          type: "faq",
          heading: "Frequently Asked Questions",
          items: [
            { q: "Which midsize sedan has the best fuel economy?", a: "Camry leads with 39 highway MPG; Accord at 38; Mazda6 at 35." },
            { q: "Are these sedans reliable?", a: "Yes—Honda and Toyota are class leaders; Mazda reliability has improved." },
            { q: "Which sedan offers the best value?", a: "Mazda6 is lowest MSRP; Accord offers best all-around value for many shoppers." },
            { q: "Do these sedans come with all-wheel drive?", a: "Camry offers AWD; Accord and Mazda6 are FWD only." },
          ],
        },
      ],
    }

    return NextResponse.json({ article }, { headers: { "cache-control": "no-store" } })
  } catch (err) {
    console.error("generate route error", err)
    return NextResponse.json({ error: "failed_to_generate" }, { status: 500 })
  }
}
