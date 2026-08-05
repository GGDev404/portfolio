export type ExperienceItem = {
  id: string;
  start: string;
  end: string;
  es: { company: string; role: string; bullets: string[] };
  en: { company: string; role: string; bullets: string[] };
};

export const experience: ExperienceItem[] = [
  {
    id: "kwan",
    start: "2025-01",
    end: "Present",
    es: {
      company: "Kwan Tecnología",
      role: "Full Stack Developer",
      bullets: [
        "Desarrollé interfaces web responsivas con SSR usando Next.js y MUI, logrando experiencias rápidas y listas para producción.",
        "Diseñé un sistema de mensajería asíncrona con BullMQ y Redis, incrementando la disponibilidad del sistema en un 40%.",
        "Diseñé e implementé un gateway IoT con protocolo MQTT para comunicación bidireccional en tiempo real.",
        "Desarrollé una app móvil de alto rendimiento con React Native, con notificaciones push escalables.",
        "Implementé autenticación segura y RBAC con AWS Cognito.",
        "Reduje la carga en la base de datos principal mediante estrategias de caché con Redis.",
        "Diseñé un flujo seguro de recuperación de contraseña basado en JWT con enlaces mágicos de SendGrid.",
        "Garanticé el 100% de integridad de datos en módulos críticos mediante transacciones en base de datos.",
      ],
    },
    en: {
      company: "Kwan Tecnología",
      role: "Full Stack Developer",
      bullets: [
        "Built responsive web interfaces with SSR using Next.js and MUI, delivering fast, production-ready experiences.",
        "Designed an asynchronous messaging system with BullMQ and Redis, increasing system availability by 40%.",
        "Designed and implemented an IoT gateway using MQTT for real-time bidirectional device communication.",
        "Built a high-performance mobile app with React Native, including scalable push notifications.",
        "Implemented secure authentication and RBAC with AWS Cognito.",
        "Reduced primary database load through Redis caching strategies.",
        "Designed a secure JWT-based password recovery flow using SendGrid magic links.",
        "Ensured 100% data integrity in critical modules via database transactions.",
      ],
    },
  },
  {
    id: "bovino-io",
    start: "2025-09",
    end: "2025-12",
    es: {
      company: "Bovino IO — Proyecto Terminal Universitario",
      role: "Backend Engineer",
      bullets: [
        "Diseñé una arquitectura backend escalable con NestJS y TypeScript para telemetría IoT en tiempo real de alta concurrencia.",
        "Construí un pipeline BLE de extremo a extremo integrando ESP32 y Raspberry Pi para edge computing.",
        "Diseñé y administré una base de datos PostgreSQL con caché en Redis y colas de procesamiento.",
        "Contenericé los servicios con Docker y los desplegué en AWS con alta disponibilidad.",
        "Logré un TTFB menor a 50ms para alertas de salud casi en tiempo real.",
      ],
    },
    en: {
      company: "Bovino IO — University Capstone Project",
      role: "Backend Engineer",
      bullets: [
        "Designed a scalable backend architecture with NestJS and TypeScript for high-concurrency real-time IoT telemetry.",
        "Built an end-to-end BLE pipeline integrating ESP32 and Raspberry Pi for edge computing.",
        "Designed and managed a PostgreSQL database with Redis caching and processing queues.",
        "Containerized services with Docker and deployed on AWS with high availability.",
        "Achieved sub-50ms TTFB for near real-time health alerts.",
      ],
    },
  },
  {
    id: "edupay",
    start: "2024-09",
    end: "2024-12",
    es: {
      company: "EduPay — Proyecto Universitario",
      role: "Backend Engineer",
      bullets: [
        "Desarrollé el backend de EduPay, desde la arquitectura hasta el despliegue.",
        "Construí un sistema de autenticación seguro basado en JWT.",
        "Integré Stripe para pagos recurrentes y únicos, con manejo completo de webhooks.",
        "Diseñé el esquema relacional y la API RESTful para todos los flujos principales.",
      ],
    },
    en: {
      company: "EduPay — University Project",
      role: "Backend Engineer",
      bullets: [
        "Developed EduPay's backend, from architecture to deployment.",
        "Built a secure JWT-based authentication system.",
        "Integrated Stripe for recurring and one-time payments, with full webhook handling.",
        "Designed the relational schema and RESTful API for all core flows.",
      ],
    },
  },
];
