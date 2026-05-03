import React, { useState } from 'react';
import { PanelSimulador } from './components/PanelSimulador';
import { ConsolaDecisiones } from './components/ConsolaDecisiones';

function App() {
  const [sitio, setSitio] = useState('Catedral Nueva');
  const [aforo, setAforo] = useState(30);
  const [clima, setClima] = useState('Soleado');
  const [tipoCliente, setTipoCliente] = useState('turista'); // 'turista' | 'administrador'
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(false);

  const agregarMensaje = (texto, tipo = 'info') => {
    const hora = new Date().toLocaleTimeString('es-EC', { hour12: false });
    setMensajes(prev => [...prev, { hora, texto, tipo }]);
  };

  const enviarDatosAlMediador = async () => {
    setCargando(true);
    agregarMensaje(`[Táctica: Discover Service] Resolviendo URLs lógicas para clima y aforo...`, 'info');
    agregarMensaje(`Enviando evento al Controlador... Header x-tipo-cliente: ${tipoCliente}`, 'accion');

    try {
      // Intentamos comunicarnos con el backend en NestJS
      const response = await fetch('http://localhost:4001/interoperabilidad/contexto', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-tipo-cliente': tipoCliente // Mejora 1: Tailor Interface
        },
        body: JSON.stringify({
          identificadorSitio: sitio,
          porcentajeOcupacion: aforo,
          estadoClimatico: clima
        })
      });

      const data = await response.json();

      if (response.status === 429) {
        // Mejora 5: Rate Limiting
        agregarMensaje(`[ERROR 429] ${data.message || 'Demasiadas solicitudes.'}`, 'alerta');
        setCargando(false);
        return;
      }

      if (!response.ok) {
        // Mejora 4: Rechazo Estructurado
        const msgError = data.errores ? JSON.stringify(data.errores) : (data.message || 'Error desconocido');
        agregarMensaje(`[ERROR ${response.status}] Petición rechazada por el Mediador: ${msgError}`, 'alerta');
        throw new Error('Rechazo por Contrato Semántico');
      }

      // Mejora 1: Tailor Interface
      if (tipoCliente === 'administrador') {
        agregarMensaje(`[MODO ADMIN] Datos Crudos del Sensor recibidos: ${JSON.stringify(data.datosCrudosSensor)}`, 'info');
        agregarMensaje(`[MODO ADMIN] URLs Resueltas: Clima (${data.datosCrudosSensor.origenClima})`, 'info');
      }
      
      agregarMensaje(`Mediador Central: ${data.mensaje || 'Datos procesados correctamente.'}`, 'exito');

      // Simulamos la respuesta de la lógica de negocio para demostración visual
      setTimeout(() => {
        if (aforo > 80) {
          agregarMensaje(`¡ALERTA DE SATURACIÓN! Orquestador detecta que ${sitio} supera el 80%.`, 'alerta');
          const rutas = clima === 'Lluvioso' ? 'Museo Remigio Crespo' : 'Ruinas de Pumapungo';
          agregarMensaje(`Redistribuyendo flujo hacia: ${rutas}`, 'exito');
        } else {
          agregarMensaje(`Orquestador Turístico: El aforo de ${sitio} (${aforo}%) es manejable.`, 'exito');
        }
      }, 500);

    } catch (error) {
      if (error.message !== 'Rechazo por Contrato Semántico') {
        agregarMensaje(`Error de conexión: Asegúrate de que el backend esté en el puerto 4001.`, 'alerta');
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
            tipoCliente={tipoCliente}
            setTipoCliente={setTipoCliente}
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
