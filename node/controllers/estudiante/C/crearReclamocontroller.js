import { insertReclamo } from '../../../models/estudiante/C/crearReclamomodel.js'

export const createReclamo = (req, res) => {
  const { userid, titulo, descripcion, visibilidad, area, categoria } = req.body;

  console.log(req.body)
  // Verificar que todos los campos necesarios estén presentes
  if (!userid || !titulo || !descripcion || !visibilidad || !area || !categoria) {
    return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
  }

  // Llamar a la función del modelo para insertar el reclamo en la base de datos
  insertReclamo({ userid, titulo, descripcion, visibilidad, area, categoria }, (err, result) => {
    if (err) {
      console.error('Error al insertar reclamo:', err);
      res.status(500).json({ success: false, message: 'Error al insertar reclamo' });
    } else {
      res.status(200).json({ success: true, message: 'Reclamo insertado con éxito' });
    }
  });
};
