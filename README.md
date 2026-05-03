# Rutas del Tiempo - Sistema Inteligente de Turismo (Cuenca, Ecuador)

Este proyecto es una solución tecnológica enfocada en resolver el **Caso de Uso CT010 (Consultar condiciones externas)**. Utiliza el **Patrón de Diseño Mediador** para recibir señales de sensores de aforo y clima, desacoplando esta entrada de la lógica de negocio y permitiendo una redistribución dinámica del flujo turístico (Metas M1, M2).

## Estructura del Proyecto

El sistema está dividido en dos grandes componentes (Monorepositorio):

```text
rutas-del-tiempo/
├── backend/                             # API y Lógica de Negocio (NestJS)
│   ├── src/turismo/
│   │   ├── dominio/
│   │   │   ├── contratos/contrato-datos-contextuales.ts # M2: Contrato Semántico (Valida datos)
│   │   │   └── eventos/evento-datos-contextuales.ts     # Objeto Evento que viaja por el Mediador
│   │   ├── aplicacion/
│   │   │   └── orquestadores/orquestador-turistico-inteligente.ts # Mediador Concreto (Reglas de negocio)
│   │   └── infraestructura/
│   │       ├── controladores/controlador-interoperabilidad.ts   # Punto de entrada HTTP (Colega)
│   │       ├── decoradores/tailor-respuesta.decorator.ts        #  Tailor Interface (Oculta datos)
│   │       ├── filtros/interoperabilidad-exception.filter.ts    #  Error Response (Auditoría)
│   │       ├── guardias/throttler-es.guard.ts                   #  Resource Management (Rate Limit)
│   │       └── registro/registro-servicios.ts                   #  Discover Service (Localiza APIs)
│   ├── app.module.ts                    # Configuración centralizada
│   └── main.ts                          # Bootstrap del servidor (Puerto 4001, Filtros Globales)
│
├── frontend/                            # Simulador Interactivo (React + Vite)
│   ├── src/components/
│   │   ├── ConsolaDecisiones.jsx        # Pantalla tipo "terminal" para ver trazas y errores visuales
│   │   └── PanelSimulador.jsx           # Panel de control para enviar estímulos simulados (CT010)
│   ├── src/App.jsx                      # Orquesta el simulador y realiza llamadas HTTP al backend
│   └── src/index.css                    # Estilos CSS
│
├── docs/                                # Documentación Técnica
│   ├── diagrama_clases.md               # Modelo estructural UML (PlantUML)
│   ├── diagrama_secuencia.md            # Flujo temporal del dato (PlantUML)
│   └── documentacion_completa.md        # Guía de exposición técnica y justificaciones (Bass et al.)
└── README.md                            # Guía General (Este archivo)
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

## 📐 Arquitectura de Interoperabilidad y Caso de Uso CT010

El sistema ha sido codificado para resolver el **Caso de Uso CT010** siguiendo las tácticas de **Interoperabilidad** e **Integridad** del libro *Software Architecture in Practice (Capítulo 6)*:

1.  **Tailor Interface:** El backend adapta la respuesta según el perfil (Turista/Admin).
2.  **Contratos Semánticos:** Validación estricta (DTOs) que rechaza datos anómalos, respondiendo a la pregunta de integridad **I1** (Sensores descalibrados).
3.  **Discover Service:** Indirección para resolver URLs de APIs externas dinámicamente, respondiendo a la pregunta de interoperabilidad **In1** (Dependencia de sistemas externos).
4.  **Rechazo y Registro:** Filtros de excepciones (Exception Filters) que auditan peticiones malformadas para no corromper la base de datos.
5.  **Gestión de Recursos:** Control de flujo (Rate Limiting) para prevenir saturación por ataques o sensores defectuosos.

---
