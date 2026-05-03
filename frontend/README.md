# Rutas del Tiempo - Frontend Simulador Interactivo

Este es el frontend desarrollado en **React** (utilizando Vite y Tailwind CSS) para el sistema **Rutas del Tiempo**. 

## Objetivo

El simulador tiene como objetivo demostrar visualmente cómo los componentes desacoplados del sistema interactúan con la lógica del negocio mediante el **Patrón Mediador**.

## Funcionalidades de la Interfaz

1. **Simulador de Sensores:** Permite simular los datos recogidos por un sensor de aforo y una API de clima para un punto turístico específico de Cuenca.
2. **Nomenclatura Clara:** La interfaz está construida con términos descriptivos y amigables para el usuario final, evitando códigos técnicos en pantalla.
3. **Consola del Mediador:** Un panel en tiempo real que captura las decisiones tomadas por el Orquestador del backend (o simuladas en el frontend si el backend no está disponible) para redistribuir a los turistas hacia zonas de menor tráfico como el *Museo Remigio Crespo* cuando un sitio supera el 80% de ocupación.

## Requisitos de Ejecución

1. Node.js instalado en el sistema.
2. Servidor backend de NestJS corriendo en el puerto 4001 (para simulación completa).

## Instrucciones

Para ejecutar este proyecto en tu máquina local:

1. Abre una terminal en esta carpeta (`/frontend`).
2. Instala las dependencias ejecutando:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre tu navegador en `http://localhost:4000`.

## Validación de la Interacción

Al presionar "Generar Itinerario Inteligente", el frontend envía una petición POST al endpoint de interoperabilidad del backend. Podrás ver en la **Consola de Decisiones** cómo el flujo es interceptado por el Mediador del backend, que evalúa las condiciones climáticas y de aforo para sugerir rutas alternativas de manera dinámica y adaptativa.
