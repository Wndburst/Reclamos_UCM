import { insertFaq } from '../../../models/administrador/C/crearFaqmodel.js'

export const crearFaq = (req, res) => {
    const { PREGUNTA,RESPUESTA,ACTIVO } = req.body;

  // Verificar que todos los campos necesarios estén presentes
  if (!PREGUNTA || !RESPUESTA || !ACTIVO ) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Llamar a la función del modelo para insertar el reclamo en la base de datos
  insertFaq({ PREGUNTA, RESPUESTA, ACTIVO}, (err, result) => {
    if (err) {
      console.error('Error al insertar FAQ:', err);
      res.status(500).json({ success: false, message: 'Error al insertar FAQ' });
    } else {
      res.status(200).json({ success: true, message: 'FAQ insertado con éxito' });
    }
  });
};
