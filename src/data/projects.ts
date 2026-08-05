export type Project = {
  slug: string;
  liveUrl: string;
  repoUrl?: string;
  image: string;
  stack: string[];
  featured: boolean;
  es: { name: string; role: string; summary: string; impact: string[] };
  en: { name: string; role: string; summary: string; impact: string[] };
};

export const projects: Project[] = [
  {
    slug: "red-mayoral",
    liveUrl: "https://red-mayoral-landing.vercel.app/",
    repoUrl: "https://github.com/GGDev404/red-mayoral-landing",
    image: "/projects/red-mayoral.jpg",
    stack: ["Astro", "TypeScript", "Zod", "Resend", "Vercel"],
    featured: true,
    es: {
      name: "Red Mayoral",
      role: "Full Stack Developer — Landing page y captura de leads",
      summary:
        "Landing page de Red Mayoral, un concepto de monitoreo de ganado por IoT (tags BLE + gateways ESP32). Construida con Astro, incluye una página de demo del dashboard y un formulario de captura de leads con notificaciones automáticas por correo.",
      impact: [
        "Sitio estático generado con Astro, con imágenes optimizadas y fuentes precargadas para carga rápida",
        "Endpoint serverless (/api/lead) con validación de datos vía Zod y envío de notificaciones por correo con Resend",
        "Página de demo del dashboard para mostrar el producto sin depender de un backend en vivo",
        "Desplegado en Vercel",
      ],
    },
    en: {
      name: "Red Mayoral",
      role: "Full Stack Developer — Landing page & lead capture",
      summary:
        "Landing page for Red Mayoral, an IoT cattle-monitoring concept (BLE tags + ESP32 gateways). Built with Astro, it includes a dashboard demo page and a lead-capture form with automated email notifications.",
      impact: [
        "Static site generated with Astro, with optimized images and preloaded fonts for fast loading",
        "Serverless endpoint (/api/lead) with Zod validation and email notifications via Resend",
        "Dashboard demo page to showcase the product without a live backend dependency",
        "Deployed on Vercel",
      ],
    },
  },
  {
    slug: "algolis",
    liveUrl: "https://www.algolis.systems/",
    repoUrl: "https://github.com/GGDev404/algolis-landing-page",
    image: "/projects/algolis.jpg",
    stack: ["Next.js", "TypeScript", "TailwindCSS", "SSR"],
    featured: true,
    es: {
      name: "Algolis",
      role: "Full Stack Developer",
      summary:
        "Landing page de producto con renderizado del lado del servidor, enfocada en performance y una experiencia de usuario rápida y lista para producción.",
      impact: [
        "SSR con Next.js para tiempos de carga optimizados",
        "Diseño responsivo de principio a fin",
        "Desplegado y en producción",
      ],
    },
    en: {
      name: "Algolis",
      role: "Full Stack Developer",
      summary:
        "Server-side rendered product landing page, focused on performance and a fast, production-ready user experience.",
      impact: [
        "SSR with Next.js for optimized load times",
        "End-to-end responsive design",
        "Deployed and live in production",
      ],
    },
  },
  {
    slug: "quiz-manejo-merida",
    liveUrl: "https://quizz-chi-ten.vercel.app/",
    repoUrl: "https://github.com/GGDev404/quiz-manejo-merida",
    image: "/projects/quiz-manejo.jpg",
    stack: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    featured: true,
    es: {
      name: "Quiz de Licencia de Manejo — Mérida",
      role: "Full Stack Developer",
      summary:
        "Aplicación web para practicar el examen teórico de la licencia de manejo en Mérida, Yucatán, con preguntas reales del examen y retroalimentación inmediata.",
      impact: [
        "Interfaz de práctica interactiva con seguimiento de progreso",
        "Construido con Next.js y TypeScript, desplegado en Vercel",
      ],
    },
    en: {
      name: "Driving License Quiz — Mérida",
      role: "Full Stack Developer",
      summary:
        "Web app to practice the driving license theory exam in Mérida, Yucatán, with real exam questions and instant feedback.",
      impact: [
        "Interactive practice interface with progress tracking",
        "Built with Next.js and TypeScript, deployed on Vercel",
      ],
    },
  },
  {
    slug: "edupay",
    liveUrl: "",
    image: "/projects/edupay.svg",
    stack: ["NestJS", "TypeScript", "Stripe", "JWT", "PostgreSQL", "REST"],
    featured: false,
    es: {
      name: "EduPay",
      role: "Backend Engineer — Proyecto universitario",
      summary:
        "Backend de una plataforma de gestión de pagos, desde la arquitectura hasta el despliegue, con autenticación segura basada en JWT e integración de Stripe.",
      impact: [
        "Integración de Stripe para pagos recurrentes y únicos, con manejo completo de webhooks",
        "Esquema relacional y API RESTful para todos los flujos de pagos y usuarios",
        "Colaboración ágil con equipo de frontend basada en Git",
      ],
    },
    en: {
      name: "EduPay",
      role: "Backend Engineer — University project",
      summary:
        "Backend for a payment management platform, from architecture to deployment, with secure JWT-based authentication and Stripe integration.",
      impact: [
        "Stripe integration for recurring and one-time payments, with full webhook handling",
        "Relational schema and RESTful API for all payment and user flows",
        "Agile, Git-based collaboration with the frontend team",
      ],
    },
  },
];
