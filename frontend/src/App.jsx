import React, { useState } from 'react';
import { PanelSimulador } from './components/PanelSimulador';
import { ConsolaDecisiones } from './components/ConsolaDecisiones';

function App() {
  const [sitio, setSitio] = useState('Catedral Nueva');
  const [aforo, setAforo] = useState(30);
  const [clima, setClima] = useState('Soleado');
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(false);

  const agregarMensaje = (texto, tipo = 'info') => {
    const hora = new Date().toLocaleTimeString('es-EC', { hour12: false });
    setMensajes(prev => [...prev, { hora, texto, tipo }]);
  };

  const enviarDatosAlMediador = async () => {
    setCargando(true);
    agregarMensaje(`Leyendo sensor en ${sitio}... Aforo: ${aforo}%, Clima: ${clima}`, 'info');
    agregarMensaje(`Enviando evento al Controlador de Interoperabilidad...`, 'accion');

    try {
      // Intentamos comunicarnos con el backend en NestJS
      const response = await fetch('http://localhost:4001/interoperabilidad/contexto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identificadorSitio: sitio,
          porcentajeOcupacion: aforo,
          estadoClimatico: clima
        })
      });

      if (!response.ok) throw new Error('Error en la comunicación con el Mediador');

      const data = await response.json();
      agregarMensaje(`Mediador Central recibió los datos: ${data.mensaje}`, 'exito');

      // Simulamos la respuesta de la lógica de negocio para demostración visual
      // ya que el backend imprime en su propia consola
      setTimeout(() => {
        if (aforo > 80) {
          agregarMensaje(`¡ALERTA DE SATURACIÓN! El Orquestador Turístico ha detectado que ${sitio} supera el 80% de aforo.`, 'alerta');
          setTimeout(() => {
            agregarMensaje(`ServicioAlgoritmoRutas: Calculando itinerario alternativo considerando clima ${clima}...`, 'accion');
            setTimeout(() => {
              const rutas = clima === 'Lluvioso' ? 'Museo Remigio Crespo' : 'Ruinas de Pumapungo';
              agregarMensaje(`ServicioNotificacionesUbicuas: Enviando alerta push a usuarios sugiriendo visitar ${rutas}.`, 'exito');
            }, 800);
          }, 800);
        } else {
          agregarMensaje(`Orquestador Turístico: El aforo de ${sitio} (${aforo}%) es manejable. No se requiere redistribución.`, 'exito');
        }
      }, 500);

    } catch (error) {
      agregarMensaje(`Error de conexión con el backend: Asegúrate de tener el servidor NestJS corriendo en localhost:3001.`, 'alerta');

      // Fallback para demostración sin backend
      agregarMensaje(`(Modo Simulación Activo sin Backend)`, 'info');
      if (aforo > 80) {
        agregarMensaje(`¡ALERTA DE SATURACIÓN! Orquestador detecta que ${sitio} supera el 80%.`, 'alerta');
        agregarMensaje(`Redirigiendo flujo hacia ${clima === 'Lluvioso' ? 'Museos' : 'Parques'}...`, 'exito');
      } else {
        agregarMensaje(`Aforo normal. No se requiere intervención.`, 'exito');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col font-sans">
      {/* Elementos decorativos de fondo para estética Premium */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-300/30 blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-3xl opacity-50 pointer-events-none"></div>

      <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-blue-600 shadow-lg shadow-brand-500/30 flex items-center justify-center text-white font-bold text-xl">
              R
            </div>
            <div>
              <h1 className="font-bold text-xl text-slate-800 leading-tight">Rutas del Tiempo</h1>
              <p className="text-xs text-brand-600 font-medium tracking-wide uppercase">Turismo Inteligente Cuenca</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10 items-start relative z-0">

        <div className="flex-1 w-full flex flex-col gap-6">


          <PanelSimulador
            sitio={sitio}
            setSitio={setSitio}
            aforo={aforo}
            setAforo={setAforo}
            clima={clima}
            setClima={setClima}
            enviarDatos={enviarDatosAlMediador}
            cargando={cargando}
          />
        </div>

        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <ConsolaDecisiones mensajes={mensajes} />
        </div>

      </main>
    </div>
  );
}

export default App;
