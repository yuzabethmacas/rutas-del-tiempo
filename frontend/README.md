# Rutas del Tiempo - Frontend Simulador Interactivo

Este es el frontend desarrollado en **React** (utilizando Vite y Tailwind CSS) para el sistema **Rutas del Tiempo**. 

## Objetivo

El simulador tiene como objetivo demostrar visualmente cómo los componentes desacoplados del sistema interactúan con la lógica del negocio mediante el **Patrón Mediador** y diversas tácticas de **Interoperabilidad**.

## Funcionalidades de la Interfaz

1.  **Perfil de Interoperabilidad (Mejora: Tailor Interface):**
    *   Permite alternar entre un perfil de **Turista** y uno de **Administrador**.
    *   Demuestra cómo el backend adapta la respuesta según el header `x-tipo-cliente`. Los administradores pueden visualizar metadatos técnicos y URLs resueltas.
2.  **Simulador de Sensores:**
    *   Controladores deslizantes y botones para alterar el aforo (%) y el clima (Soleado/Lluvioso).
3.  **Visualización de Tácticas Arquitectónicas:**
    *   La consola muestra en tiempo real cuando ocurre un **Discover Service** (indirección de URLs).
    *   Manejo visual de errores de **Rate Limiting** (429) y **Rechazos por Contrato Semántico** (400).
4.  **Consola del Mediador:** Panel que captura las decisiones tomadas por el Orquestador del backend para redistribuir el tráfico turístico en Cuenca.

## Requisitos de Ejecución

1.  Node.js instalado.
2.  Servidor backend de NestJS corriendo en el puerto **4001**.

## Instrucciones

1.  Instalar dependencias: `npm install`
2.  Iniciar desarrollo: `npm run dev`
3.  Abrir navegador en: `http://localhost:4000`

---

## Escenarios de Prueba en el Simulador

-   **Escenario A (Administración):** Cambia el perfil a "Administrador" y genera un itinerario. Verás en la consola los "Datos Crudos del Sensor" que el backend adjunta solo para este perfil.
-   **Escenario B (Rate Limit):** Presiona el botón de generar itinerario repetidamente (más de 10 veces en un minuto). Verás el error 429 con mensaje en español enviado desde el backend.
-   **Escenario C (Redistribución):** Simula un aforo del 90% en la Catedral Nueva durante un día lluvioso. Observa cómo el Mediador sugiere el "Museo Remigio Crespo" como ruta alternativa.
