import { MapPin, Users, CloudRain, Sun, ShieldCheck } from 'lucide-react';

export function PanelSimulador({ 
  sitio, 
  setSitio, 
  aforo, 
  setAforo, 
  clima, 
  setClima,
  tipoCliente,
  setTipoCliente,
  enviarDatos,
  cargando
}) {
  const sitiosDisponibles = [
    'Catedral Nueva',
    'Parque Calderón',
    'Mercado 10 de Agosto',
    'Calle Larga',
    'Mirador de Turi'
  ];

  return (
    <div className="glass-card p-6 flex flex-col gap-8 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Mejora 1: Perfil de Interoperabilidad */}
      <div className="space-y-3 p-4 bg-slate-100/50 rounded-2xl border border-slate-200">
        <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2 uppercase tracking-wider">
          <ShieldCheck size={16} className="text-brand-600" />
          Perfil de Interoperabilidad
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => setTipoCliente('turista')}
            className={`text-xs py-2 px-3 rounded-lg font-medium transition-all ${tipoCliente === 'turista' ? 'bg-brand-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
          >
            Turista (Estandar)
          </button>
          <button 
            onClick={() => setTipoCliente('administrador')}
            className={`text-xs py-2 px-3 rounded-lg font-medium transition-all ${tipoCliente === 'administrador' ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
          >
            Administrador (Full)
          </button>
        </div>
      </div>      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <MapPin className="text-brand-500" size={24} />
          CT010: Consulta Condiciones (Sensor)
        </h2>
        <p className="text-sm text-slate-500">Selecciona el punto turístico que emitirá la señal externa al Mediador.</p>
        <select 
          className="w-full mt-2 p-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
          value={sitio}
          onChange={(e) => setSitio(e.target.value)}
        >
          {sitiosDisponibles.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <CloudRain className="text-brand-500" size={24} />
          Condiciones Climáticas
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <button 
            className={`btn-secondary flex items-center justify-center gap-2 ${clima === 'Soleado' ? 'btn-active ring-2 ring-brand-500' : ''}`}
            onClick={() => setClima('Soleado')}
          >
            <Sun size={18} className={clima === 'Soleado' ? 'text-brand-500' : 'text-amber-500'} />
            Soleado
          </button>
          <button 
            className={`btn-secondary flex items-center justify-center gap-2 ${clima === 'Lluvioso' ? 'btn-active ring-2 ring-brand-500' : ''}`}
            onClick={() => setClima('Lluvioso')}
          >
            <CloudRain size={18} className={clima === 'Lluvioso' ? 'text-brand-500' : 'text-slate-400'} />
            Lluvioso
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Users className="text-brand-500" size={24} />
          Disponibilidad de Aforo
        </h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">Ocupación Actual</span>
          <span className={`text-lg font-bold ${aforo > 80 ? 'text-red-500' : aforo > 50 ? 'text-amber-500' : 'text-emerald-500'}`}>
            {aforo}%
          </span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={aforo}
          onChange={(e) => setAforo(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>Vacío (0%)</span>
          <span>Saturado (100%)</span>
        </div>
        
        {/* Helper buttons for quick simulation */}
        <div className="flex gap-2 pt-2">
          <button onClick={() => setAforo(30)} className="text-xs text-brand-600 hover:text-brand-700 bg-brand-50 px-2 py-1 rounded-md">Simular 30%</button>
          <button onClick={() => setAforo(90)} className="text-xs text-red-600 hover:text-red-700 bg-red-50 px-2 py-1 rounded-md">Simular 90%</button>
        </div>
      </div>

      <button 
        className="btn-primary w-full mt-2 flex justify-center items-center gap-2"
        onClick={enviarDatos}
        disabled={cargando}
      >
        {cargando ? (
          <span className="animate-pulse">Sincronizando con el Mediador...</span>
        ) : (
          'Generar Itinerario Inteligente'
        )}
      </button>
    </div>
  );
}
