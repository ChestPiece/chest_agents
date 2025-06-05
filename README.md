# Chest Agents

A Next.js application featuring AI agents with a modern UI, smooth animations, and dark/light mode support.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables Management

This project uses environment variables for configuration. To set them up:

1. Create a `.env.local` file in the root directory
2. Add your environment variables following this structure:

```
# API Keys
NEXT_PUBLIC_API_URL=https://api.example.com
API_KEY=your_api_key_here

# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# Authentication
AUTH_SECRET=your_auth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Third Party Services
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Security Best Practices

- **NEVER commit `.env` files to version control**
- Use `.env.local` for local development
- Use deployment platform's environment variables feature for production
- Keep API keys and secrets out of your codebase
- Prefix public variables with `NEXT_PUBLIC_` so they're available on the client-side

## Build

To build the application for production:

```bash
npm run build
# or
yarn build
```

Then, run the production server:

```bash
npm start
# or
yarn start
```

## Project Structure

- `/src/components` - UI components
- `/src/app` - App router pages
- `/src/lib` - Utility functions
- `/src/context` - React context providers
- `/public` - Static assets

## Technologies Used

- Next.js
- React
- Framer Motion
- Tailwind CSS
- TypeScript
- Supabase (Authentication and Database)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
