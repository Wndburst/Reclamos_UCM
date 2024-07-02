import { updateReclamoById } from '../../../models/estudiante/U/editarReclamomodel.js'

export const updateReclamo = (req, res) => {
  const { idReclamo, titulo, descripcion, idArea, idCategoria, visibilidad, estadoReclamo } = req.body;
  
  updateReclamoById({ idReclamo, titulo, descripcion, idArea, idCategoria, visibilidad, estadoReclamo }, (err, result) => {
    if (err) {
      console.error('Error al actualizar el reclamo:', err);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    } else {
      res.status(200).json({ success: true, message: 'Reclamo actualizado correctamente' });
    }
  });
};
