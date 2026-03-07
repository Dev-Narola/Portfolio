# Dev Narola — Portfolio

> Minimal, high-performance AI Engineer portfolio built with React, Three.js, and GSAP.

[![Live Demo](https://img.shields.io/badge/Live-devnarola.in-black?style=flat-square&logo=vercel)](https://devnarola.in)
[![GitHub](https://img.shields.io/badge/GitHub-Dev--Narola-black?style=flat-square&logo=github)](https://github.com/Dev-Narola)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-devnarola-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/devnarola)

---

## ✨ Features

- **Interactive Three.js Scenes** — Unique WebGL animations on every page (neural network, icosahedron, particle drift, magnetic particles, and a cursor-reactive dot grid)
- **Custom Cursor** — Magnetic hover effect with smooth GSAP tracking
- **Smooth Scrolling** — Powered by Lenis for buttery-smooth page scroll
- **GSAP Animations** — Scroll-triggered reveals, counter animations, and page transitions
- **Contact Form** — EmailJS integration with real-time validation and success feedback
- **Fully Responsive** — Mobile-first layout with adaptive Three.js performance
- **Performance Optimized** — Code-split chunks for Three.js and GSAP, pixel ratio capping, instanced rendering

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + Vite |
| 3D / WebGL | Three.js |
| Animation | GSAP (ScrollTrigger) |
| Smooth Scroll | Lenis |
| Styling | Tailwind CSS v3 |
| Routing | React Router DOM |
| Email | EmailJS |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── components/        # Navbar, CustomCursor, PageTransition, ScrollProgress
├── pages/             # Hero, About, Work, Experience, Education, Skills, Contact
├── three/             # Three.js scene files (HeroScene, AboutScene, etc.)
├── hooks/             # useThree — reusable Three.js lifecycle hook
├── data/              # projects.js, experience.js, education.js, skills.js
└── main.jsx           # App entry — Lenis + GSAP ScrollTrigger init
public/
├── Dev-Narola-Resume.pdf
├── favicon.svg
└── og-image.png
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) (recommended) or npm

### Installation

```bash
# Clone the repo
git clone https://github.com/Dev-Narola/Portfolio.git
cd Portfolio

# Install dependencies
pnpm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> Get these from [EmailJS](https://www.emailjs.com/) after setting up an email template.

### Development

```bash
pnpm dev
```

Opens at `http://localhost:5173`

### Production Build

```bash
pnpm build
pnpm preview
```

---

## 🌐 Deployment (Vercel)

1. Push to GitHub (already done ✅)
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in **Project Settings → Environment Variables**
4. Vercel auto-detects Vite — deploy with default settings

The `vercel.json` is already configured for SPA routing:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

---

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Hero — Neural network background, animated intro |
| `/about` | About — Rotating icosahedron, stats counter |
| `/work` | Work — Project showcase on dark background |
| `/experience` | Experience — Animated vertical timeline |
| `/education` | Education — Academic cards with coursework |
| `/skills` | Skills — Categorized tech stack with icons |
| `/contact` | Contact — EmailJS form + magnetic particles |

---

## 📬 Contact

**Dev Narola** — AI Engineer  
📧 devnarola2gmail.com  
🌐 [devnarola.in](https://devnarola.in)  
💼 [linkedin.com/in/devnarola](https://linkedin.com/in/devnarola)

---

*Built with ❤️ and way too much Three.js.*
