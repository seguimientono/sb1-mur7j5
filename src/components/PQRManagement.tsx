import React, { useState, useEffect } from 'react';
import { Download, Search } from 'lucide-react';
import * as XLSX from 'xlsx';
import { PQR } from '../types/pqr';
import { searchPQRs, updatePQR } from '../services/pqrService';
import PQRDetail from './PQRDetail';

const PQRManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pqrs, setPqrs] = useState<PQR[]>([]);
  const [selectedPQR, setSelectedPQR] = useState<PQR | null>(null);

  useEffect(() => {
    const fetchPQRs = () => {
      const filteredPQRs = searchPQRs(searchTerm);
      setPqrs(filteredPQRs);
    };

    fetchPQRs();
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleExport = () => {
    const exportData = pqrs.map(pqr => ({
      'PQR': pqr.id,
      'Pedido': pqr.pedido,
      'Despacho': pqr.despacho,
      'Transportador': pqr.transportador,
      'Item': pqr.item,
      'Cantidad': pqr.cantidad,
      'OC': pqr.oc,
      'Descripción Item': pqr.descripcionItem,
      'Línea de Negocio': pqr.lineaNegocio,
      'Tipo PQR': pqr.tipoPQR,
      'Descripción': pqr.descripcion,
      'Estado PQR': pqr.estado,
      'Autorizado Por': pqr.autorizadoPor || '',
      'Fecha Autorización': pqr.fechaAutorizacion ? new Date(pqr.fechaAutorizacion).toLocaleDateString() : '',
      'OC de Reemplazo': pqr.ocReemplazo || '',
      'Despacho de Reemplazo': pqr.despachoReemplazo || '',
      'Guía de Recolección': pqr.guiaRecoleccion || '',
      'Valor Declarado': pqr.valorDeclarado || '',
      'Valor Flete': pqr.valorFlete || '',
      'Fecha NC': pqr.fechaNC ? new Date(pqr.fechaNC).toLocaleDateString() : '',
      'DOC': pqr.doc || '',
      'OC Salvamento': pqr.ocSalvamento || '',
      'Estado Mercancía': pqr.estadoMercancia || '',
      'Físico': pqr.fisico || '',
      'Guía Salvamento': pqr.guiaSalvamento || '',
      'Estado Final': pqr.estadoFinal || '',
      'Comentarios': (pqr.comments || []).map(c => `${new Date(c.createdAt).toLocaleString()} - ${c.createdBy}: ${c.text}`).join('\n')
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'PQRs');
    XLSX.writeFile(wb, 'reporte-pqrs.xlsx');
  };

  const handlePQRClick = (pqr: PQR) => {
    setSelectedPQR({
      ...pqr,
      comments: pqr.comments || []
    });
  };

  const handleUpdatePQR = (updatedPQR: PQR) => {
    updatePQR(updatedPQR);
    setPqrs(prevPqrs => 
      prevPqrs.map(p => p.id === updatedPQR.id ? updatedPQR : p)
    );
    setSelectedPQR(updatedPQR);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestionar PQRs</h2>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <Download className="w-5 h-5 mr-2" />
          Exportar a Excel
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar PQR..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PQR</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pedido</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OC</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado PQR</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autorizado Por</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado Final</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pqrs.map((pqr) => (
              <tr
                key={pqr.id}
                onClick={() => handlePQRClick(pqr)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">{pqr.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pqr.pedido}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pqr.item}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pqr.cantidad}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pqr.oc}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pqr.estado}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pqr.autorizadoPor || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pqr.estadoFinal || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPQR && (
        <PQRDetail
          pqr={selectedPQR}
          onClose={() => setSelectedPQR(null)}
          onUpdate={handleUpdatePQR}
        />
      )}
    </div>
  );
};

export default PQRManagement;