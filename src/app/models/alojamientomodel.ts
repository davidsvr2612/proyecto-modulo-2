export interface Alojamientomodel {
  id: number;
  nombre: string;
  descripcion: string;
  ciudad: string;
  ubicacion: string;
  tipo: string;
  capacidad: number;
  habitaciones: number;
  camas: number;
  banos: number;
  precioNoche: number;
  tarifaLimpieza: number;
  calificacion: number;
  activo: boolean;
  servicios: string[];
  reglas: string[];
  anfitrion?: Anfitrion;
  resenas?: Resena[];
  fechasOcupadas?: string[];
}

export interface Anfitrion {
  id: number;
  nombre: string;
  foto: string;
  esSuperAnfitrion: boolean;
}

export interface Resena {
  id: number;
  alojamientoId: number;
  usuario: string;
  calificacion: number;
  comentario: string;
  fecha: string;
}
