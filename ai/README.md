# Vehicle Intelligence Platform

A production-ready AI-powered content generation system for creating rich, data-driven vehicle comparison articles using OpenAI.

## Features

- **AI-Powered Content Generation**: Generate comprehensive vehicle articles with OpenAI GPT-4o-mini
- **Rich Interactive Components**: Comparison tables, spec grids, quizzes, calculators, and more
- **GitHub Publishing**: Publish articles directly to GitHub repository
- **Live Preview**: Real-time preview with schema validation
- **Animated UI**: Smooth entrance animations and interactive hover effects
- **Dark Mode**: Full dark mode support with liquid neon design
- **SEO Optimized**: JSON-LD schema, OpenGraph tags, and semantic HTML

## Quick Start

### Prerequisites

- Node.js 18+
- OpenAI API key
- GitHub personal access token (for publishing)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/automata-2.git
cd automata-2
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Edit `.env.local` and add your keys:
\`\`\`env
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini

# For GitHub publishing (optional for local development)
GITHUB_TOKEN=your_github_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name
GITHUB_BRANCH=main
GITHUB_RAW_BASE=https://raw.githubusercontent.com/owner/repo/main

BASE_URL=http://localhost:3000
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000)

## Usage

### Generate Articles

1. Navigate to `/admin/generate`
2. Enter a title (e.g., "2026 Toyota Camry vs Honda Accord")
3. Optionally add custom instructions for each section
4. Click "Generate Article" or press `Ctrl+G` (Windows) / `Cmd+G` (Mac)
5. Preview the generated article
6. Click "Publish Article" or press `Ctrl+P` / `Cmd+P` to publish

### View Articles

- Homepage: `/` - Lists all published articles
- Article page: `/articles/[slug]` - View individual article
- Articles API: `/api/articles` - Get all articles as JSON

## Project Structure

\`\`\`
├── app/
│   ├── admin/generate/      # Article generation interface
│   ├── api/                 # API routes
│   │   ├── generate/        # Content generation endpoint
│   │   ├── publish/         # Publishing endpoint
│   │   └── articles/        # Articles API
│   ├── articles/            # Article pages
│   └── page.tsx             # Homepage
├── src/
│   ├── components/
│   │   ├── ArticleView.tsx  # Main article renderer
│   │   ├── blocks/          # Content block components
│   │   ├── modules/         # Interactive modules
│   │   └── layout/          # Layout components
│   └── lib/
│       ├── articleSchema.ts # Zod schema
│       ├── publish.ts       # Publishing logic
│       └── slugify.ts       # Slug generation
├── components/              # Enhanced UI components
├── lib/
│   ├── openai-generator.tsx # OpenAI integration
│   └── storage.tsx          # Article storage
└── content/
    └── articles/            # Published articles (JSON)
\`\`\`

## API Endpoints

### Generate Article

\`\`\`bash
POST /api/generate
Content-Type: application/json

{
  "title": "2026 Toyota Camry vs Honda Accord",
  "models": [
    {"name": "Camry LE", "hp": 203, "mpg": 39, "price": 27950},
    {"name": "Accord EX", "hp": 192, "mpg": 38, "price": 28990}
  ],
  "customInstructions": {
    "tldr": "Custom TL;DR content",
    "keyTakeaways": ["Takeaway 1", "Takeaway 2"]
  }
}
\`\`\`

### Publish Article

\`\`\`bash
POST /api/publish
Content-Type: application/json

{
  "article": { ... }
}
\`\`\`

### Get Articles

\`\`\`bash
GET /api/articles
\`\`\`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL`
   - `GITHUB_TOKEN`
   - `GITHUB_OWNER`
   - `GITHUB_REPO`
   - `GITHUB_BRANCH`
   - `GITHUB_RAW_BASE`
   - `BASE_URL`
4. Deploy

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key | Yes |
| `OPENAI_MODEL` | OpenAI model (default: gpt-4o-mini) | No |
| `GITHUB_TOKEN` | GitHub personal access token | For publishing |
| `GITHUB_OWNER` | GitHub username/org | For publishing |
| `GITHUB_REPO` | GitHub repository name | For publishing |
| `GITHUB_BRANCH` | Git branch (default: main) | No |
| `GITHUB_RAW_BASE` | Raw GitHub URL base | For loading articles |
| `BASE_URL` | Base URL of your site | No |

## Features in Detail

### AI-Powered Generation

The system uses OpenAI GPT-4o-mini to generate comprehensive vehicle articles with:
- Compelling introductions
- Detailed comparison tables
- Specification grids
- Pros & cons analysis
- FAQ sections
- Interactive quizzes
- Fuel economy calculators
- Expert reviews

### Interactive Components

- **Comparison Tables**: Sortable tables with automatic highlighting
- **Spec Grids**: Organized specification cards
- **Quizzes**: Interactive quizzes with explanations
- **Calculators**: Fuel economy and cost calculators
- **Reviews**: Aggregated expert reviews with ratings

### Design System

- Liquid neon design with animated gradients
- Smooth entrance animations
- Interactive hover effects
- Responsive layout
- Dark mode support

## Development

### Run Tests

\`\`\`bash
npm test
\`\`\`

### Build for Production

\`\`\`bash
npm run build
\`\`\`

### Lint Code

\`\`\`bash
npm run lint
\`\`\`

## Troubleshooting

### Build Errors

If you encounter TypeScript errors during build:
1. Ensure all dependencies are installed: `npm install`
2. Clear Next.js cache: `rm -rf .next`
3. Rebuild: `npm run build`

### Publishing Issues

If articles don't appear after publishing:
1. Check that `GITHUB_TOKEN` has `repo` scope
2. Verify `GITHUB_OWNER` and `GITHUB_REPO` are correct
3. Check Vercel deployment logs for errors
4. Ensure the article was committed to GitHub

### OpenAI Errors

If generation fails:
1. Verify `OPENAI_API_KEY` is set correctly
2. Check OpenAI API status
3. Ensure you have sufficient API credits
4. Try a simpler title or fewer custom instructions

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
