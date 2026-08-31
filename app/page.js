'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export default function CRMDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    obtenerLeads();
  }, []);

  async function obtenerLeads() {
    const { data, error } = await supabase
      .from('leads')
      .select('*');
      
    if (error) {
      console.error("Error al cargar los leads:", error);
    } else {
      setLeads(data);
    }
  }

  const columnas = ['nuevo', 'conversando', 'cerrado'];

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen font-sans transition-colors duration-300">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#006500] dark:text-[#00c900] tracking-tight transition-colors">
            CRM Agrolar Motor
          </h1>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00c900]"
          >
            {isDarkMode ? '☀️ Habilitar Modo Claro' : '🌙 Habilitar Modo Oscuro'}
          </button>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-6">
          {columnas.map(columna => (
            <div key={columna} className="bg-gray-100/50 dark:bg-gray-800/50 p-4 rounded-xl border border-[#00c900]/30 dark:border-[#00c900]/20 min-w-[320px] transition-colors">
              <div className="flex items-center justify-between mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
                <h2 className="text-lg font-semibold text-[#006500] dark:text-gray-100 capitalize">
                  {columna}
                </h2>
                <span className="bg-[#00c900]/20 dark:bg-[#00c900]/10 text-[#006500] dark:text-[#00c900] px-2 py-0.5 rounded-full text-sm font-bold">
                  {leads.filter(l => l.estado === columna).length}
                </span>
              </div>
              
              <div className="space-y-4">
                {leads.filter(lead => lead.estado === columna).map(lead => (
                  <div key={lead.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-[#00c900]/50 transition-all flex flex-col gap-3">
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{lead.nombre}</h3>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1 block">{lead.origen}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
                        lead.prioridad === 'Alta' ? 'bg-[#006500] text-white dark:bg-[#00c900]/20 dark:text-[#00c900]' : 
                        lead.prioridad === 'Media' ? 'bg-[#ffc400]/30 text-[#006500] dark:bg-[#ffc400]/20 dark:text-[#ffc400]' : 
                        'bg-[#00c900]/20 text-[#006500] dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {lead.prioridad}
                      </span>
                    </div>

                    <div className="bg-[#00c900]/5 dark:bg-[#00c900]/10 border-l-2 border-[#00c900] p-3 rounded-r-lg">
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                        "{lead.resumen_ia}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <span className="text-sm text-gray-400 font-medium">{lead.fecha}</span>
                      <button className="bg-[#006500] dark:bg-[#00c900]/20 text-white dark:text-[#00c900] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#00c900] dark:hover:bg-[#00c900]/40 transition-colors focus:ring-2 focus:ring-[#00c900] focus:outline-none">
                        Ver chat
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}