import models from "../models";
//Encriptador, para la contraseña
import bcrypt from 'bcryptjs';
//Token
import token from "../services/token";

export default{
    //Agregar Usuario
    add: async(req, res, next) => {
        try {
            const salt = await bcrypt.genSaltSync(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
            const reg = await models.Usuario.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error en la creación de Usuario.'
            })
            next(error);
        }
    },
    //Consultar Usuario
    query: async(req, res, next) => {
        try {
            const reg = await models.Usuario.findOne({_id: req.query._id});
            if (!reg) {
                res.status(404).send({
                    message: 'El registro no existe.'
                });
            } else {
                res.status(200).json(reg);
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error en la lectura de Usuario.'
            })
            next(error);
        }    
    },
    //Listar Usuarios
    list: async(req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Usuario.find(
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
                message: 'Ocurrió un error en la lista de Usuario.'
            })
            next(error);
        }
        
    },
    //Actualizar Usuario
    update: async(req, res, next) => {
        try {
            let pas = req.body.password;
            const reg0 = await models.Usuario.findOne({_id:req.body._id});
            if (pas!=reg0.password){
                req.body.password = await bcrypt.hash(req.body.password,10); 
            }
            const reg = await models.Usuario.findByIdAndUpdate(
                {_id: req.body._id},
                {
                    rol: req.body.rol,
                    nombre: req.body.nombre,
                    email: req.body.email,
                    password: req.body.password,
                }
            );
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error en la actualización de Usuario.'
            })
            next(error);
        }
        
    },
    //Eliminar Usuario
    remove: async(req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndDelete({_id: req.body._id});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error en la eliminación de Usuario.'
            })
            next(error);
        }
        
    },
    //Activar Usuario
    activate: async(req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({_id: req.body._id},{estado: 1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error en la activación de Usuario.'
            })
            next(error);
        }
        
    },
    //Desactivar Usuario
    deactivate: async(req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({_id: req.body._id},{estado: 0});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error en la desactivación de Usuario.'
            })
            next(error);
        }
    },
    
    login: async(req, res, next) => {
        try {
            let user = await models.Usuario.findOne({email: req.body.email, estado: 1});
            if (user){
                let match = await bcrypt.compare(req.body.password, user.password);

                if (match){
                    let tokenReturn = await token.encode(user._id);
                    res.status(200).json({user, tokenReturn});
                } else{
                    res.status(404).send({
                        message: 'Password Incorrecto'
                    });
                }
            } else{
                res.status(404).send({
                    message: 'No existe el usuario'
                });
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error en la desactivación de Usuario.'
            })
            next(error);
        }
    }
}