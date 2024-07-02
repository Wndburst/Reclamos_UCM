import { updateFaq } from '../../../models/administrador/U/editarFaqmodel.js'

export const editarFaq = (req, res) => {
    const { idFaq, nuevaPregunta, nuevaRespuesta, nuevoActivo } = req.body;

  updateFaq({ nuevaPregunta, nuevaRespuesta, nuevoActivo, idFaq}, (err, result) => {
    if (err) {
      console.error('Error al actualizar Faq:', err);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    } else {
      res.status(200).json({ success: true, message: 'Faq actualizado correctamente' });
    }
  });
};
