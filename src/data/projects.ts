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
    slug: "bovino-io",
    liveUrl: "https://red-mayoral-landing.vercel.app/",
    image: "/projects/red-mayoral.jpg",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "BLE", "ESP32", "Raspberry Pi", "Docker", "AWS"],
    featured: true,
    es: {
      name: "Bovino IO / Red Mayoral",
      role: "Backend Engineer — Proyecto terminal universitario",
      summary:
        "Plataforma de monitoreo de salud de ganado en tiempo real. Diseñé una arquitectura backend escalable con NestJS capaz de procesar telemetría IoT de alta concurrencia, con un pipeline BLE de extremo a extremo integrando ESP32 y Raspberry Pi para edge computing.",
      impact: [
        "TTFB menor a 50ms para alertas de salud casi en tiempo real",
        "Base de datos PostgreSQL con caché en Redis y colas para picos de datos a gran escala",
        "Servicios contenerizados con Docker y desplegados en AWS con alta disponibilidad",
        "MVP funcional con modelo de negocio validado para ranchos comerciales e investigación científica",
      ],
    },
    en: {
      name: "Bovino IO / Red Mayoral",
      role: "Backend Engineer — University capstone project",
      summary:
        "Real-time cattle health monitoring platform. I designed a scalable backend architecture with NestJS capable of processing high-concurrency IoT telemetry, with an end-to-end BLE pipeline integrating ESP32 and Raspberry Pi for edge computing.",
      impact: [
        "Sub-50ms TTFB for near real-time health alerts",
        "PostgreSQL database with Redis caching and queues to handle large-scale data spikes",
        "Services containerized with Docker and deployed on AWS with high availability",
        "Fully functional MVP with a validated business model for commercial ranches and scientific research",
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
