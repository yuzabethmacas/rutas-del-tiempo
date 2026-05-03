import React, { useRef, useEffect } from 'react';
import { Terminal, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export function ConsolaDecisiones({ mensajes }) {
  const consolaRef = useRef(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (consolaRef.current) {
      consolaRef.current.scrollTop = consolaRef.current.scrollHeight;
    }
  }, [mensajes]);

  return (
    <div className="glass-card flex flex-col w-full max-w-lg overflow-hidden animate-in fade-in slide-in-from-right-4 duration-700 h-[600px]">
      <div className="bg-slate-900/90 text-white px-4 py-3 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-brand-400" />
          <h3 className="font-semibold text-sm tracking-wide">Consola de Decisiones (Mediador)</h3>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
        </div>
      </div>
      
      <div 
        ref={consolaRef}
        className="flex-1 bg-slate-900/95 p-4 overflow-y-auto terminal-scroll font-mono text-sm"
      >
        {mensajes.length === 0 ? (
          <div className="text-slate-500 flex flex-col items-center justify-center h-full gap-3 opacity-50">
            <Terminal size={48} strokeWidth={1} />
            <p>Esperando señales de los sensores...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mensajes.map((msg, idx) => (
              <div 
                key={idx} 
                className={`animate-in fade-in slide-in-from-left-2 duration-300 flex gap-3 ${
                  msg.tipo === 'alerta' ? 'text-amber-400' :
                  msg.tipo === 'exito' ? 'text-emerald-400' :
                  msg.tipo === 'accion' ? 'text-brand-300' :
                  'text-slate-300'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {msg.tipo === 'alerta' ? <AlertCircle size={16} /> :
                   msg.tipo === 'exito' ? <CheckCircle2 size={16} /> :
                   msg.tipo === 'accion' ? <ArrowRight size={16} /> :
                   <span className="text-slate-500">{'>'}</span>}
                </div>
                <div className="leading-relaxed">
                  <span className="opacity-50 text-xs mr-2">[{msg.hora}]</span>
                  {msg.texto}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
