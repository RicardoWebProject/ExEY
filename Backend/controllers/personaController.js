import models from "../models";

export default{
    //Agregar Persona
    add: async(req, res, next) => {
        try {
            const reg = await models.Persona.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error en la creación de PERSONA.'
            })
            next(error);
        }
    },
    //Consultar Persona
    query: async(req, res, next) => {
        try {
            const reg = await models.Persona.findOne({_id: req.query._id});
            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe.'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error en la lectura de PERSONA.'
            })
            next(error);
        }    
    },
    //Listar Personas
    list: async(req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Persona.find(
                {$or:
                    [
                        {'nombre':new RegExp(valor,'i')},
                        {'email':new RegExp(valor,'i')}
                    ]
                },
                {createdAt:0}
            )
            .sort({'createdAt':-1});

            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error en la lista de PERSONA.'
            })
            next(error);
        }
        
    },
    //Actualizar Persona
    update: async(req, res, next) => {
        try {
            const reg = await models.Persona.findByIdAndUpdate(
                {_id: req.body._id},
                {
                    tipo_persona: req.body.tipo_persona,
                    nombre: req.body.nombre,
                    num_documento: req.body.num_documento,
                    telefono: req.body.telefono,
                    email: req.body.email
                }
            );
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error en la actualización de PERSONA.'
            })
            next(error);
        }
        
    },
    //Eliminar Persona
    remove: async(req, res, next) => {
        try {
            const reg = await models.Persona.findByIdAndDelete({_id: req.body._id});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error en la eliminación de PERSONA.'
            })
            next(error);
        }
        
    },
    //Activar Persona
    activate: async(req, res, next) => {
        try {
            const reg = await models.Persona.findByIdAndUpdate({_id: req.body._id},{estado: 1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error en la activación de PERSONA.'
            })
            next(error);
        }
        
    },
    //Desactivar Persona
    deactivate: async(req, res, next) => {
        try {
            const reg = await models.Persona.findByIdAndUpdate({_id: req.body._id},{estado: 0});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error en la desactivación de PERSONA.'
            })
            next(error);
        }
        
    },
}