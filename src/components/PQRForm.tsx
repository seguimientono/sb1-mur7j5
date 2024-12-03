import React, { useState } from 'react';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import FormField from './FormField';
import FileUpload from './FileUpload';
import { PQR } from '../types/pqr';
import { savePQR } from '../services/pqrService';

interface FormData {
  pedido: string;
  despacho: string;
  transportador: string;
  guia: string;
  item: string;
  cantidad: string;
  oc: string;
  descripcionItem: string;
  descripcion: string;
  lineaNegocio: string;
  tipoPQR: string;
  email: string;
}

const initialFormData: FormData = {
  pedido: '',
  despacho: '',
  transportador: '',
  guia: '',
  item: '',
  cantidad: '',
  oc: '',
  descripcionItem: '',
  descripcion: '',
  lineaNegocio: '',
  tipoPQR: '',
  email: '',
};

const PQRForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.pedido || !formData.descripcion) {
      toast.error('Por favor complete todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newPQR: PQR = {
        id: '', // This will be set by the service
        ...formData,
        cantidad: parseInt(formData.cantidad) || 0,
        archivos: files,
        createdBy: formData.email,
        createdAt: new Date(),
        estado: 'Pendiente',
        comments: [],
        valorDeclarado: 0,
        valorFlete: 0
      };

      savePQR(newPQR);
      toast.success('PQR creada exitosamente');
      setFormData(initialFormData);
      setFiles([]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al crear la PQR');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const tipoPQROptions = [
    'Avería',
    'Pérdida',
    'Expoliación',
    'Siniestro'
  ];

  const lineasNegocioOptions = [
    'Línea 1',
    'Línea 2',
    'Línea 3',
    'Otra'
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Crear Nueva PQR</h2>
        
        <div className="grid grid-cols-12 gap-4">
          {/* Primera fila */}
          <div className="col-span-3">
            <FormField
              label="Pedido"
              name="pedido"
              value={formData.pedido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-3">
            <FormField
              label="Despacho"
              name="despacho"
              value={formData.despacho}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-3">
            <FormField
              label="Transportador"
              name="transportador"
              value={formData.transportador}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-3">
            <FormField
              label="Guía"
              name="guia"
              value={formData.guia}
              onChange={handleChange}
              required
            />
          </div>

          {/* Segunda fila */}
          <div className="col-span-3">
            <FormField
              label="Item"
              name="item"
              value={formData.item}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-3">
            <FormField
              label="Cantidad"
              name="cantidad"
              type="number"
              value={formData.cantidad}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-3">
            <FormField
              label="Orden de Compra"
              name="oc"
              value={formData.oc}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-3">
            <FormField
              label="Descripción Item"
              name="descripcionItem"
              value={formData.descripcionItem}
              onChange={handleChange}
              required
            />
          </div>

          {/* Tercera fila */}
          <div className="col-span-3">
            <div className="flex flex-col">
              <label htmlFor="tipoPQR" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de PQR
              </label>
              <select
                id="tipoPQR"
                name="tipoPQR"
                value={formData.tipoPQR}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                required
              >
                <option value="">Seleccione</option>
                {tipoPQROptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col">
              <label htmlFor="lineaNegocio" className="block text-sm font-medium text-gray-700 mb-1">
                Línea de Negocio
              </label>
              <select
                id="lineaNegocio"
                name="lineaNegocio"
                value={formData.lineaNegocio}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                required
              >
                <option value="">Seleccione</option>
                {lineasNegocioOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-span-6">
            <FormField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Descripción PQR - Ancho completo */}
          <div className="col-span-12">
            <FormField
              label="Descripción de la PQR"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              isTextArea
              rows={4}
            />
          </div>

          {/* Archivos Adjuntos */}
          <div className="col-span-12">
            <FileUpload onFileChange={setFiles} />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 mr-2" />
            {isSubmitting ? 'Creando...' : 'Crear PQR'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PQRForm;