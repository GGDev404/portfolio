# Portfolio — Geovany González

Personal portfolio built to showcase full stack / backend engineering work: real-time IoT systems, scalable backends, and production web apps.

**Live:** _add URL after deploying_

## Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS v4
- [next-intl](https://next-intl.dev/) — ES/EN localization
- Framer Motion

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000/es](http://localhost:3000/es) or `/en`.

## Structure

- `src/app/[locale]` — routes (localized)
- `src/components` — UI components and page sections
- `src/data` — project, experience, and skills content
- `messages/*.json` — UI copy per locale

## Deploy

Deployed on [Vercel](https://vercel.com).
