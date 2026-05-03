# Rutas del Tiempo - Sistema Inteligente de Turismo (Cuenca, Ecuador)

Este proyecto es una solución tecnológica enfocada en resolver el **Caso de Uso CT010 (Consultar condiciones externas)**. Utiliza el **Patrón de Diseño Mediador** para recibir señales de sensores de aforo y clima, desacoplando esta entrada de la lógica de negocio y permitiendo una redistribución dinámica del flujo turístico (Metas M1, M2).

## Estructura del Proyecto

El sistema está dividido en dos grandes componentes (Monorepositorio):

```text
rutas-del-tiempo/
├── backend/                # Lógica de Negocio y Orquestación (NestJS)
│   ├── src/
│   │   ├── turismo/        # Módulo Principal del Dominio
│   │   │   ├── dominio/     # Reglas de negocio puras y eventos
│   │   │   ├── aplicacion/  # Orquestadores y Casos de Uso (Mediadores)
│   │   │   └── infraestructura/ # Controladores y entrada de datos
│   │   ├── app.module.ts
│   │   └── main.ts         # Configuración del servidor (Puerto 4001)
│   └── README.md           # Guía técnica del Backend y Patrón Mediador
│
├── frontend/               # Interfaz Visual y Simulador (React + Vite)
│   ├── src/
│   │   ├── components/     # Componentes visuales (Panel, Consola)
│   │   ├── App.jsx         # Lógica del simulador y conexión con API
│   │   └── index.css       # Estilos con Tailwind CSS y Glassmorphism
│   ├── tailwind.config.cjs # Configuración de diseño y colores brand
│   └── README.md           # Guía de uso del Simulador
└── README.md               # Este archivo (Guía General)
```

---

## 🛠️ Componentes y Responsabilidades

### 1. Backend (`/backend`) - El Cerebro
Implementado con **NestJS** y **CQRS** (@nestjs/cqrs).
- **Mediador Central:** Utiliza el Bus de Eventos para recibir señales de sensores sin acoplarse a ellos.
- **Orquestador Turístico:** Evalúa si un sitio (ej. Catedral Nueva) tiene más del 80% de aforo.
- **Servicios de Dominio:** 
    - *Algoritmo de Rutas:* Recalcula el itinerario hacia patrimonio menos visitado (Museo Remigio Crespo, Ruinas de Pumapungo).
    - *Notificaciones Ubicuas:* Genera alertas push para los turistas.

### 2. Frontend (`/frontend`) - El Simulador
Implementado con **React**, **Vite** y **Tailwind CSS**.
- **Panel de Sensores:** Permite al presentador simular cambios en tiempo real de aforo y clima.
- **Consola de Decisiones:** Muestra paso a paso cómo el Mediador del backend intercepta los datos y decide redistribuir el flujo.
- **Estética:** Diseño moderno basado en *Glassmorphism* para una experiencia premium y de alta usabilidad.

---

## 🚀 Guía de Ejecución Rápida

Para ver el sistema en funcionamiento, abre dos terminales:

### Paso 1: Levantar Backend
```bash
cd backend
npm install
npm run start:dev
```
*El servidor correrá en: `http://localhost:4001`*

### Paso 2: Levantar Frontend
```bash
cd frontend
npm install
npm run dev
```
*El simulador correrá en: `http://localhost:4000`*

---

## 📐 Arquitectura de Interoperabilidad (Capítulo 6)

El sistema ha sido mejorado siguiendo las tácticas de **Interoperabilidad** del libro *Software Architecture in Practice*:

1.  **Tailor Interface:** El backend adapta la respuesta según el perfil (Turista o Administrador) mediante interceptores dinámicos.
2.  **Contratos Semánticos:** Validación estricta de modelos de datos (DTOs) para asegurar que los sensores hablen el mismo idioma que el Mediador.
3.  **Discover Service:** Implementación de indirección para resolver URLs de servicios externos (clima, aforo) sin acoplamiento rígido.
4.  **Rechazo y Registro:** Filtros de excepciones que auditan peticiones malformadas y protegen el núcleo del sistema.
5.  **Gestión de Recursos:** Control de flujo (Rate Limiting) para prevenir saturación por sensores defectuosos.

---

## 📚 Documentación para la Presentación

He consolidado toda la información necesaria (guías, pruebas y arquitectura) en un solo lugar:

👉 **[Documentación Completa del Proyecto](./docs/documentacion_completa.md)**

En este documento encontrarás:
- Estructura detallada del proyecto.
- Guía de instalación desde GitHub.
- Explicación profunda de Tácticas y Patrones.
- Guía paso a paso para la demo en vivo.
- Enlaces a los diagramas de Clases y Secuencia.


---