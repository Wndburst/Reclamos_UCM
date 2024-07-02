import { deleteReclamoById } from '../../../models/estudiante/D/borrarReclamomodel.js'

export const deleteReclamo = async (req, res) => {
  const { idReclamo } = req.body;

  try {
    await deleteReclamoById(idReclamo);
    res.json({ success: true, message: 'Reclamo borrado exitosamente' });
  } catch (error) {
    console.error('Error al borrar el reclamo:', error);
    res.status(500).json({ success: false, message: 'Error al borrar el reclamo' });
  }
};
