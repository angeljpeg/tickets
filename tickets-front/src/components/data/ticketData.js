export const tickets = [
  {
    id: 1,
    titulo: "Error en la impresora",
    estado: "COMPLETADO",
    prioridad: "BAJO",
    fechaSolicitud: "02-09-24 12:30:00",
    fechaFinalizado: "02-09-24 14:30:00",
    descripcion: "La impresora no prendeeeeeee",
    fk_idUsuario: 1,
    fk_idTecnico: 2
  },
  {
    id: 2,
    titulo: "Pantalla azul al iniciar",
    estado: "EN PROCESO",
    prioridad: "ALTO",
    fechaSolicitud: "01-09-24 08:15:00",
    fechaFinalizado: null,
    descripcion: "El sistema operativo muestra una pantalla azul al encender.",
    fk_idUsuario: 2,
    fk_idTecnico: 2
  },
  {
    id: 3,
    titulo: "Problema con el correo corporativo",
    estado: "COMPLETADO",
    prioridad: "MEDIO",
    fechaSolicitud: "30-08-24 10:45:00",
    fechaFinalizado: "30-08-24 12:15:00",
    descripcion: "No se pueden enviar ni recibir correos desde la cuenta principal.",
    fk_idUsuario: 1,
    fk_idTecnico: 2
  },
  {
    id: 4,
    titulo: "Lentitud en la red",
    estado: "NO REVISADO",
    prioridad: "MEDIO",
    fechaSolicitud: "28-08-24 09:00:00",
    fechaFinalizado: null,
    descripcion: "Toda la oficina está experimentando lentitud en la conexión de internet.",
    fk_idUsuario: 1,
    fk_idTecnico: 2
  },
  {
    id: 5,
    titulo: "Teclado deja de responder",
    estado: "COMPLETADO",
    prioridad: "BAJO",
    fechaSolicitud: "26-08-24 13:20:00",
    fechaFinalizado: "26-08-24 14:05:00",
    descripcion: "El teclado funciona por momentos y luego deja de responder.",
    fk_idUsuario: 4,
    fk_idTecnico: 2
  },
  {
    id: 6,
    titulo: "Actualización de software fallida",
    estado: "EN PROCESO",
    prioridad: "ALTO",
    fechaSolicitud: "25-08-24 11:50:00",
    fechaFinalizado: null,
    descripcion: "La actualización del sistema operativo se detuvo al 80% y no arranca.",
    fk_idUsuario: 4,
    fk_idTecnico: 2
  },
  {
    id: 7,
    titulo: "Impresión a doble cara no funciona",
    estado: "COMPLETADO",
    prioridad: "BAJO",
    fechaSolicitud: "24-08-24 15:00:00",
    fechaFinalizado: "24-08-24 16:00:00",
    descripcion: "La impresora no imprime correctamente a doble cara.",
    fk_idUsuario: 3,
    fk_idTecnico: 2
  },
  {
    id: 8,
    titulo: "Pantalla parpadea intermitentemente",
    estado: "NO REVISADO",
    prioridad: "MEDIO",
    fechaSolicitud: "23-08-24 14:10:00",
    fechaFinalizado: null,
    descripcion: "La pantalla del monitor parpadea con frecuencia.",
    fk_idUsuario: 2,
    fk_idTecnico: 2
  },
  {
    id: 9,
    titulo: "Error al guardar archivos en red",
    estado: "COMPLETADO",
    prioridad: "ALTO",
    fechaSolicitud: "22-08-24 09:45:00",
    fechaFinalizado: "22-08-24 11:30:00",
    descripcion: "No se pueden guardar archivos en la unidad de red compartida.",
    fk_idUsuario: 3,
    fk_idTecnico: 2
  },
  {
    id: 10,
    titulo: "Aplicación no arranca",
    estado: "EN PROCESO",
    prioridad: "ALTO",
    fechaSolicitud: "21-08-24 10:25:00",
    fechaFinalizado: null,
    descripcion: "La aplicación de contabilidad no se abre al intentar ejecutarla.",
    fk_idUsuario: 5,
    fk_idTecnico: 6
  },
  {
    id: 11,
    titulo: "Problema con el proyector",
    estado: "COMPLETADO",
    prioridad: "MEDIO",
    fechaSolicitud: "20-08-24 16:00:00",
    fechaFinalizado: "20-08-24 16:45:00",
    descripcion: "El proyector no detecta señal al conectar el cable HDMI.",
    fk_idUsuario: 5,
    fk_idTecnico: 6
  }
];
