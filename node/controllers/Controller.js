//import Modelo from "../models/Models.js";


/* metodos para crud */

// mostrar todos los registros
/*export const getAllUser = async(req, res) => {
    try {
        const usuarios = await Modelo.sequelize.query(
            'Select * from usuarios',
            {type: Modelo.sequelize.QueryTypes.SELECT}
        )
        res.json(usuarios);
    } catch (error) {
        res.json({message: error.message})
    }
}

// Mostrar 1 registro
export const getUser = async (req, res) =>{
    try {
        const usuarios = await Modelo.findAll({
            where:{id:req.params.id}
        })
        res.json(usuarios[0])
    } catch (error) {
        res.json({message: error.message})
    }
}

// crear un registro

export const createUser = async (req,res) =>{
    try {
        await Modelo.create(req.body)
        res.json({
            "message":"Registro creado correctamente"
        })
    } catch (error) {
        res.json({message:error.message})
    }
}

// actualizar registro

export const updateUser = async (req,res) =>{
    try {
        await Modelo.update(req.body,{
            where:{id: req.params.id}
        })
        res.json({
            "message":"Registro actualizado"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

// borrar registro

export const deleteUser  = async (req,res) =>{
    try {
        await Modelo.destroy({
            where: {id: req.params.id}
        })
        res.json({
            "message":"Registro borrado"
        })

    } catch (error) {
        res.json({message: error.message})
    }
}*/