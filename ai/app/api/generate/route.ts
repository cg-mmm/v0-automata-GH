import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type TOCItem = { id: string; label: string };
type TableRow = Record<string, string>;
type SpecItem = { label: string; value: string };
type SpecGroup = { title: string; items: SpecItem[] };
type FAQItem  = { q: string; a: string };

type Article = {
  title: string;
  slug: string;
  description: string;
  hero: {
    eyebrow?: string;
    headline: string;
    subheadline?: string;
    image?: { url: string; alt?: string };
    badges?: { label: string }[];
    cta?: { label: string; href: string };
  };
  toc: TOCItem[];
  blocks: (
    | { type: "intro"; html: string }
    | { type: "comparisonTable"; caption?: string; columns: string[]; rows: TableRow[]; highlightRule?: "max" | "min" }
    | { type: "specGrid"; groups: SpecGroup[] }
    | { type: "prosCons"; pros: string[]; cons: string[] }
    | { type: "faq"; items: FAQItem[] }
    | { type: "ctaBanner"; heading: string; sub?: string; href: string; label: string }
  )[];
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const topic = searchParams.get("topic") || "2026 Midsize Sedan Comparison";
  const slug = slugify(topic);

  const article: Article = {
    title: "2026 Midsize Sedan Comparison: Honda Accord vs Toyota Camry vs Mazda6",
    slug,
    description:
      "A detailed comparison and overview of three top midsize sedans, including fuel economy, performance, and value analysis",
    hero: {
      eyebrow: "Vehicle Intelligence Report",
      headline: "2026 Midsize Sedan Comparison",
      subheadline: "Honda Accord vs Toyota Camry vs Mazda6 - Which sedan offers the best value?",
      image: { url: "/2026-midsize-sedan-comparison.jpg", alt: "2026 Honda Accord, Toyota Camry, and Mazda6 side by side" },
      badges: [{ label: "Updated 2026" }, { label: "Expert Analysis" }, { label: "164+ Data Points" }],
      cta: { label: "Get Pricing", href: "#pricing" },
    },
    toc: [
      { id: "overview", label: "Overview" },
      { id: "performance", label: "Performance" },
      { id: "fuel-economy", label: "Fuel Economy" },
      { id: "specs", label: "Specifications" },
      { id: "pros-cons", label: "Pros & Cons" },
      { id: "faq", label: "FAQ" },
    ],
    blocks: [
      {
        type: "intro",
        html:
          "<p>The midsize sedan segment remains one of the most competitive in the automotive market. For 2026, the Honda Accord, Toyota Camry, and Mazda6 continue to set the standard for reliability, comfort, and value. This comprehensive comparison examines every aspect of these three popular sedans to help you make an informed decision.</p><p>Each vehicle brings unique strengths to the table: the Accord offers sporty handling and a refined interior, the Camry provides legendary reliability and strong resale value, while the Mazda6 delivers upscale styling and engaging driving dynamics.</p>",
      },
      {
        type: "comparisonTable",
        caption: "Key Specifications Comparison",
        columns: ["Metric", "Honda Accord", "Toyota Camry", "Mazda6"],
        rows: [
          { Metric: "Starting Price", "Honda Accord": "$27,950", "Toyota Camry": "$27,950", Mazda6: "$26,950" },
          { Metric: "Horsepower", "Honda Accord": "192 hp", "Toyota Camry": "203 hp", Mazda6: "187 hp" },
          { Metric: "City MPG", "Honda Accord": "30", "Toyota Camry": "28", Mazda6: "26" },
          { Metric: "Highway MPG", "Honda Accord": "38", "Toyota Camry": "39", Mazda6: "35" },
          { Metric: "Cargo Space", "Honda Accord": "16.7 cu ft", "Toyota Camry": "15.1 cu ft", Mazda6: "14.7 cu ft" },
          { Metric: "Warranty", "Honda Accord": "3yr/36k mi", "Toyota Camry": "3yr/36k mi", Mazda6: "3yr/36k mi" },
        ],
        highlightRule: "max",
      },
      {
        type: "specGrid",
        groups: [
          {
            title: "Performance",
            items: [
              { label: "Engine", value: "2.5L 4-Cylinder" },
              { label: "Horsepower", value: "192 hp @ 6,500 rpm" },
              { label: "Torque", value: "192 lb-ft @ 3,500 rpm" },
              { label: "Transmission", value: "CVT Automatic" },
              { label: "0-60 mph", value: "7.8 seconds" },
            ],
          },
          {
            title: "Fuel Economy",
            items: [
              { label: "City", value: "30 MPG" },
              { label: "Highway", value: "38 MPG" },
              { label: "Combined", value: "33 MPG" },
              { label: "Fuel Tank", value: "14.8 gallons" },
              { label: "Range", value: "488 miles" },
            ],
          },
          {
            title: "Dimensions",
            items: [
              { label: "Length", value: "192.2 inches" },
              { label: "Width", value: "73.3 inches" },
              { label: "Height", value: "57.1 inches" },
              { label: "Wheelbase", value: "111.4 inches" },
              { label: "Curb Weight", value: "3,131 lbs" },
            ],
          },
        ],
      },
      {
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
      {
        type: "faq",
        items: [
          {
            q: "Which midsize sedan has the best fuel economy?",
            a: "The Toyota Camry leads with 39 highway MPG, followed closely by the Honda Accord at 38 MPG. The Mazda6 achieves 35 highway MPG.",
          },
          {
            q: "Are these sedans reliable?",
            a: "Yes, all three sedans have excellent reliability ratings. Toyota and Honda consistently rank among the most reliable brands, and Mazda has significantly improved its reliability in recent years.",
          },
          {
            q: "Which sedan offers the best value?",
            a: "The Mazda6 has the lowest starting price at $26,950, but the Honda Accord offers the best combination of features, space, and fuel economy for the money.",
          },
          {
            q: "Do these sedans come with all-wheel drive?",
            a: "The Toyota Camry offers an available AWD system. The Honda Accord and Mazda6 are front-wheel drive only.",
          },
        ],
      },
      {
        type: "ctaBanner",
        heading: "Ready to Find Your Perfect Sedan?",
        sub: "Compare prices from local dealers and get the best deal",
        href: "/get-quote",
        label: "Get Free Quote",
      },
    ],
  };

  return NextResponse.json({ article }, { headers: { "cache-control": "no-store" } });
}
