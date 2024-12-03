export interface Comment {
  id: string;
  text: string;
  createdBy: string;
  createdAt: Date;
}

export interface PQR {
  id: string;
  pedido: string;
  despacho: string;
  transportador: string;
  guia: string;
  item: string;
  cantidad: number;
  oc: string;
  descripcionItem: string;
  descripcion: string;
  lineaNegocio: string;
  tipoPQR: string;
  archivos: File[];
  createdBy: string;
  createdAt: Date;
  estado: string;
  autorizadoPor?: string;
  fechaAutorizacion?: Date;
  ocReemplazo?: string;
  despachoReemplazo?: string;
  guiaRecoleccion?: string;
  valorDeclarado?: number;
  valorFlete?: number;
  fechaNC?: Date;
  doc?: string;
  ocSalvamento?: string;
  estadoMercancia?: string;
  fisico?: string;
  guiaSalvamento?: string;
  estadoFinal?: string;
  comments: Comment[];
}