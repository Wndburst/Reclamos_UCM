import { borrarFaq } from "../../../models/administrador/D/borrarFaqmodel.js"

export const deleteFaq = async (req, res) => {
    const { idFaq } = req.body;

  try {
    await borrarFaq(idFaq);
    res.json({ success: true, message: 'Faq borrado exitosamente' });
  } catch (error) {
    console.error('Error al borrar el Faq:', error);
    res.status(500).json({ success: false, message: 'Error al borrar el Faq' });
  }
};
