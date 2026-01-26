# Evox Ventures

Evox Ventures is a premium event management and spatial architecture agency. This repository contains the source code for the official Evox Ventures digital platform. It represents a high-end, immersive digital experience showcasing our capabilities in engineering sophisticated environments for global networks.

## Key Features

- **Cinematic Digital Experience:** Immersive animations, fluid page transitions, and modern glassmorphic aesthetics.
- **Dynamic Portfolio Showcase:** High-end visual galleries of past elite corporate events, tech hackathons, and luxury retreats.
- **Budget Estimator:** An interactive, real-time tool for clients to dynamically calculate preliminary project costs.
- **Integrated Contact & RFQ:** Seamless connection points optimized to convert high-value leads.
- **Performant & Responsive:** A highly optimized Next.js stack with smooth scroll behavior and responsive typography.

## Tech Stack

The application is built completely utilizing modern full-stack web technologies:

- **Framework:** Next.js (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS + Vanilla CSS Modules for specific architectural animations
- **Animations:** Framer Motion, GSAP, and Embla Carousel
- **Deployment & Edge:** Deployed on Vercel (or seamlessly adaptable to similar edge environments)

## Project Structure

```text
evox-ventures/
├── client/
│   ├── src/
│   │   ├── app/            # Next.js App Router (Pages, Layouts, API Routes)
│   │   ├── components/     # Reusable and Modular UI components (Home, Portfolio, Layouts)
│   │   └── lib/            # Utilities, Configs, and helper functions
│   ├── public/             # Static Assets, images, and public elements
│   ├── tailwind.config.js  # Styling configurations
│   └── package.json        # Project scripts and dependencies
└── README.md
```

## Setup and Installation

Follow these steps to set up the repository locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/singhankit001/evox-ventures.git
   cd evox-ventures/client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

## Deployment

The platform is designed to be highly portable and edge-ready. Pushing to a modern edge provider like Vercel or AWS Amplify will automatically detect the Next.js framework and configure builds accordingly.

## Roadmap & Future Enhancements

- WebGL/Three.js interactive heroic 3D experiences.
- Advanced client portal for ongoing event logistics and tracking.
- Automated CRM pipeline integration with the contact API route.

## Author

**Ankit Singh** - Architect and lead engineer for the digital presence.
