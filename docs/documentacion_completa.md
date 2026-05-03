# Documentación Completa: Proyecto "Rutas del Tiempo"

Este documento consolida toda la información técnica, arquitectónica y operativa del sistema para facilitar su instalación, comprensión y exposición.

---

## 1. Estructura del Proyecto

El sistema es un monorepositorio dividido en dos grandes bloques:

```text
rutas-del-tiempo/
├── backend/                # Lógica de Negocio y Orquestación (NestJS)
│   ├── src/turismo/
│   │   ├── dominio/        # Contratos Semánticos y Eventos
│   │   ├── aplicacion/     # Orquestadores (Mediador Concreto)
│   │   └── infraestructura/ # Controladores, Filtros, Guardias e Interceptores
│   └── README.md           # Guía técnica específica del Backend
│
├── frontend/               # Interfaz Visual y Simulador (React)
│   ├── src/components/     # Panel de Simulación y Consola
│   └── README.md           # Guía técnica específica del Frontend
│
├── docs/                   # Documentación y Diagramas
│   ├── diagrama_clases.md
│   ├── diagrama_secuencia.md
│   └── documentacion_completa.md # (Este archivo)
└── README.md               # Guía General de Entrada
```

---

## 2. Guía de Instalación y Configuración

### Paso 1: Clonar el Repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd rutas-del-tiempo
```

### Paso 2: Configuración del Backend (Puerto 4001)
1. `cd backend`
2. `npm install`
3. `npm run start:dev`

### Paso 3: Configuración del Frontend (Puerto 4000)
1. (En otra terminal) `cd frontend`
2. `npm install`
3. `npm run dev`

---

## 3. Arquitectura: Patrón Mediador para la Interoperabilidad

### La Narrativa
Cuenca necesita gestionar su turismo de forma inteligente. Para evitar el acoplamiento rígido entre sensores y aplicaciones, usamos un **Mediador** que centraliza las decisiones de redistribución de flujo.

### Tácticas de Interoperabilidad (Capítulo 6 - Bass et al.)

| Táctica | Componente Código | Propósito | Efecto Colateral |
| :--- | :--- | :--- | :--- |
| **Tailor Interface** | `TailorRespuestaInterceptor` | Adapta la respuesta según el rol (Turista/Admin). | Mayor carga en el servidor por filtrado. |
| **Semantic Contract** | `ContratoDatosContextualesDto` | Valida rangos y tipos de datos (M2). | Rigidez ante cambios de formato externos. |
| **Discover Service** | `RegistroServicios` | Localiza APIs externas mediante nombres lógicos (M3). | Punto único de fallo en el registro. |
| **Error Response** | `InteroperabilidadExceptionFilter` | Loguea y audita peticiones rechazadas (M4). | Riesgo de saturación de logs en disco. |
| **Resource Mgmt** | `ThrottlerEspanolGuard` | Rate Limiting para proteger el Mediador (M5). | Posible bloqueo de usuarios legítimos. |

### Más allá del Mediador (Otros Patrones)
- **Observer:** El Bus de Eventos notifica al Orquestador cuando llega una señal.
- **Singleton:** El Registro de Servicios es una instancia única y compartida.
- **Interceptor/Proxy:** Los escudos de validación y límites de tasa.

---

## 4. Guía de Uso y Demostración en Vivo

### El Simulador
1. **Perfil:** Elige "Administrador" para ver datos técnicos ocultos (Tailor Interface).
2. **Aforo:** Sube el slider a > 80% para disparar la lógica de redistribución del Mediador.
3. **Clima:** Cambia entre "Lluvioso" y "Soleado" para ver cómo el Mediador sugiere museos o parques.

### Pruebas para impresionar al Profesor:
- **Prueba de Robustez (Rate Limit):** Presiona el botón de generar 11 veces rápido. Verás el error 429.
- **Prueba de Auditoría:** Si el backend recibe datos fuera de rango (ej. aforo 150), verás el rechazo estructurado en los logs del servidor.

---

## 5. Mapeo Diagrama vs Código

- **Diagrama de Clases:** [Ver aquí](../docs/diagrama_clases.md)
  - *Mediador Central:* `EventBus` de `@nestjs/cqrs`.
  - *Mediador Concreto:* `OrquestadorTuristicoInteligente`.
- **Diagrama de Secuencia:** [Ver aquí](../docs/diagrama_secuencia.md)
  - *Flujo:* Sensor -> Throttler -> Validator -> Discovery -> EventBus -> Tailor -> Sensor.

---

## 6. Bibliografía
- **Bass, L., et al. (2012).** *Software Architecture in Practice* (3rd Ed.). Capítulo 6: Interoperability.
- **Gamma, E., et al. (1994).** *Design Patterns*. Patrón Mediador.
