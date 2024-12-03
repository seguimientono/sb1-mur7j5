import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { PQR, Comment } from '../types/pqr';
import { useAuth } from '../context/AuthContext';

interface PQRDetailProps {
  pqr: PQR;
  onClose: () => void;
  onUpdate: (updatedPQR: PQR) => void;
}

const PQRDetail: React.FC<PQRDetailProps> = ({ pqr, onClose, onUpdate }) => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedPQR, setEditedPQR] = useState(pqr);

  const handleAddComment = () => {
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      text: newComment,
      createdBy: user.email,
      createdAt: new Date(),
    };

    const updatedPQR = {
      ...pqr,
      comments: [...(pqr.comments || []), comment],
    };

    onUpdate(updatedPQR);
    setNewComment('');
  };

  const handleSaveChanges = () => {
    onUpdate(editedPQR);
    setEditMode(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedPQR(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Detalle PQR: {pqr.id}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <button
            onClick={() => setEditMode(!editMode)}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {editMode ? 'Cancelar Edición' : 'Editar PQR'}
          </button>

          {editMode ? (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Estado y Seguimiento</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <select
                      name="estado"
                      value={editedPQR.estado}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="En Proceso">En Proceso</option>
                      <option value="Autorizado">Autorizado</option>
                      <option value="Rechazado">Rechazado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Autorizado Por</label>
                    <input
                      type="text"
                      name="autorizadoPor"
                      value={editedPQR.autorizadoPor || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">OC de Reemplazo</label>
                    <input
                      type="text"
                      name="ocReemplazo"
                      value={editedPQR.ocReemplazo || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Despacho de Reemplazo</label>
                    <input
                      type="text"
                      name="despachoReemplazo"
                      value={editedPQR.despachoReemplazo || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Guía de Recolección</label>
                    <input
                      type="text"
                      name="guiaRecoleccion"
                      value={editedPQR.guiaRecoleccion || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Valores y Estados</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Valor Declarado</label>
                    <input
                      type="number"
                      name="valorDeclarado"
                      value={editedPQR.valorDeclarado || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Valor Flete</label>
                    <input
                      type="number"
                      name="valorFlete"
                      value={editedPQR.valorFlete || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">DOC</label>
                    <input
                      type="text"
                      name="doc"
                      value={editedPQR.doc || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">OC Salvamento</label>
                    <input
                      type="text"
                      name="ocSalvamento"
                      value={editedPQR.ocSalvamento || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Estado Mercancía</label>
                    <input
                      type="text"
                      name="estadoMercancia"
                      value={editedPQR.estadoMercancia || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Estado Final</label>
                    <input
                      type="text"
                      name="estadoFinal"
                      value={editedPQR.estadoFinal || ''}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSaveChanges}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Información General</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Pedido:</span> {pqr.pedido}</p>
                  <p><span className="font-medium">Despacho:</span> {pqr.despacho}</p>
                  <p><span className="font-medium">Transportador:</span> {pqr.transportador}</p>
                  <p><span className="font-medium">Guía:</span> {pqr.guia}</p>
                  <p><span className="font-medium">Item:</span> {pqr.item}</p>
                  <p><span className="font-medium">Cantidad:</span> {pqr.cantidad}</p>
                  <p><span className="font-medium">OC:</span> {pqr.oc}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Estado y Seguimiento</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Estado:</span> {pqr.estado}</p>
                  <p><span className="font-medium">Autorizado por:</span> {pqr.autorizadoPor || '-'}</p>
                  <p><span className="font-medium">OC de Reemplazo:</span> {pqr.ocReemplazo || '-'}</p>
                  <p><span className="font-medium">Despacho de Reemplazo:</span> {pqr.despachoReemplazo || '-'}</p>
                  <p><span className="font-medium">Guía de Recolección:</span> {pqr.guiaRecoleccion || '-'}</p>
                  <p><span className="font-medium">Valor Declarado:</span> {pqr.valorDeclarado || '-'}</p>
                  <p><span className="font-medium">Valor Flete:</span> {pqr.valorFlete || '-'}</p>
                  <p><span className="font-medium">Estado Final:</span> {pqr.estadoFinal || '-'}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Descripción</h3>
            <p className="text-gray-700">{pqr.descripcion}</p>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center mb-4">
              <MessageSquare className="w-5 h-5 mr-2" />
              <h3 className="font-semibold">Comentarios y Trazabilidad</h3>
            </div>
            
            <div className="space-y-4 mb-4">
              {(pqr.comments || []).map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{comment.createdBy}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Agregar un comentario..."
                className="flex-1 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              />
              <button
                onClick={handleAddComment}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PQRDetail;