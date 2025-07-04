# awurm.com

A Next.js 14 website showcasing research papers, applications, and speaking engagements, hosted on AWS Amplify.

## Features

- **Research**: Academic publications and research contributions
- **Apps**: Innovative applications and software solutions
- **Talks**: Conference presentations and speaking engagements
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Static Export**: Optimized for AWS Amplify hosting

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- AWS Amplify

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Content Management

Content is managed through JSON files in `/public/data/`:

- `research.json` - Research papers and publications
- `apps.json` - Applications and software projects
- `talks.json` - Speaking engagements and presentations

## Deployment

The site is configured for AWS Amplify with automatic builds:

1. Connect your GitHub repository to Amplify
2. Use the provided `amplify.yml` for build configuration
3. Set up custom domain `awurm.com` in Amplify console

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## License

MIT
