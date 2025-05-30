## Introduction

This repository is a starting point for a live exercise where you will demonstrate a combination of problem solving and technical aptitude.

#### You Should...
* Fork and clone down this repository, ahead of time.
* Make sure that you are able to install and run the application, ahead of time.
* Reset to this initial commit at the start of the exercise.
* Demonstrate [active listening](https://hbr.org/2024/01/what-is-active-listening).
* Demonstrate [design thinking process](https://www.nngroup.com/articles/design-thinking/).

#### You May...
* Use any IDE (We recommend [Cursor AI](https://cursor.sh/) or [VS Code](https://code.visualstudio.com/) + Co-Pilot).
* Use any AI Assistance
* Feel free to created branches and practice applying new ideas.

## Setup

1. **Initial Setup**
   ```bash
   # Clone the repository
   git clone https://github.com/ryansh100/fullstack-typescript-exercise.git
   cd fullstack-typescript-exercise
   ```

2. **Install Dependencies**
   ```bash
   # Choose one of these commands based on your package manager
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **API Key Setup**
   - Get an API key from [OMDB API](https://www.omdbapi.com/apikey.aspx)
   - Verify your API key by following the verification link sent to your email
   - Create a `.env` file in the root directory
   - Add your API key to the `.env` file:
     ```bash
     OMDB_API_KEY=your_api_key_here
     ```

4. **Database Setup**
   ```bash
   # Initialize the database and apply migrations
   npx prisma migrate dev

   # (Optional) Seed the database with initial data
   npx prisma db seed

   # (Optional) Open Prisma Studio to view and manage your data
   npx prisma studio
   ```

5. **Running the Application**
   ```bash
   # Choose one of these commands based on your package manager
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Access the Application**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - The page will auto-update as you edit files

## Important Notes

### API Routes
- The watched movies API endpoints are located in `app/api/watched-movies/route.ts`
- API routes in Next.js 13+ are defined using the Route Handlers pattern
- For more details, see the [Next.js Route Handlers documentation](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### Client Components
- Components that need to run in the browser must include the `"use client"` directive at the top of the file
- This is required for components that use:
  - Browser APIs
  - React hooks (useState, useEffect, etc.)
  - Event listeners
  - Client-side interactivity
- For more details, see the [Next.js Client Components documentation](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

## References

### UI Components and Styling
This project uses [Shadcn/ui](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/) for styling and components.

#### Shadcn/ui
Shadcn/ui is a collection of re-usable components built using Radix UI and Tailwind CSS. To add new components:

1. Visit the [Shadcn/ui documentation](https://ui.shadcn.com/docs/components)
2. Choose a component you want to add
3. Run the following command to add it to your project:
```bash
npx shadcn-ui@latest add [component-name]
```

#### Tailwind CSS
This project uses Tailwind CSS for utility-first styling. To learn more:

1. Check out the [Tailwind CSS documentation](https://tailwindcss.com/docs)
2. Use the [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet) for quick reference
3. Customize your theme in `tailwind.config.js`

### Next.js Resources
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Fonts
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
