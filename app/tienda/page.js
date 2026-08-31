'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';

export default function TiendaPublica() {
  const [productos, setProductos] = useState([]);
  const [errorDB, setErrorDB] = useState(null);

  useEffect(() => {
    async function obtenerProductos() {
      const { data, error } = await supabase.from('productos').select('*');
      if (error) {
        setErrorDB(error.message);
      } else if (data) {
        setProductos(data);
      }
    }
    obtenerProductos();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-[#006500] tracking-tight">Catálogo Agrolar Motor</h1>
        <p className="text-gray-500 mb-8">Herramientas agrícolas y de construcción</p>
        
        {errorDB && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 font-bold">
            Error de conexión: {errorDB}
          </div>
        )}

        {productos.length === 0 && !errorDB && (
          <p className="text-gray-500 italic">Cargando inventario...</p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map(prod => (
            <div key={prod.id} className="bg-white p-6 rounded-xl border border-[#00c900]/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs bg-[#ffc400]/30 text-[#006500] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  {prod.categoria}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-4 leading-tight">{prod.nombre}</h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{prod.descripcion}</p>
              </div>
              
              <div className="mt-6 flex justify-between items-end border-t border-gray-100 pt-4">
                <span className="text-3xl font-bold text-[#006500]">${prod.precio_usd}</span>
                <span className={`text-sm font-bold px-2 py-1 rounded-md ${prod.stock > 0 ? 'bg-[#00c900]/10 text-[#00c900]' : 'bg-red-50 text-red-600'}`}>
                  {prod.stock > 0 ? `Disponibles: ${prod.stock}` : 'Agotado'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}