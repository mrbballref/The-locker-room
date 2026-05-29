# The Locker Room

Production monorepo starter for Raising The Bar Officiating's basketball film platform.

## Package 1: Production Source Code

This repository contains the initial production source foundation for:

- Next.js web app
- React Native / Expo mobile app
- Shared TypeScript types
- Shared video engine utilities
- RTBO brand configuration

## Apps

```txt
apps/web      Next.js web platform
apps/mobile   Expo iOS and Android app
```

## Packages

```txt
packages/types         Shared TypeScript models
packages/video-engine  Shared video playback/download logic
packages/ui            Shared UI tokens and helpers
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run web app:

```bash
npm run dev:web
```

Run mobile app:

```bash
npm run dev:mobile
```

## Environment

Copy `.env.example` to the proper app environment file and fill in Supabase keys.

No fake video data is included. The app expects real Supabase records and signed video URLs.
