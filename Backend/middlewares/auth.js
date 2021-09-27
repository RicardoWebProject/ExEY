//Token
import tokenService from "../services/token";

export default {
    verifyUsuario: async (req, res, next) => {
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }

        const response = await tokenService.decode(req.headers.token);

        if (response.rol == 'Administrador' || response.rol == 'Vendedor' || response.rol == 'administrador' || response.rol == 'vendedor'){
            next();
        } else {
            return res.status(403).send({
                message: 'Usuario no autorizado'
            });
        }
    },
    
    verifyAdministrador: async (req, res, next) => {
        if (!req.headers.token){
            return res.status(404).send({
                message: 'No token'
            });
        }
    
        const response = await tokenService.decode(req.headers.token);
    
        if (response.rol == 'Administrador' || response.rol == 'administrador'){
            next();
        } else {
            return res.status(403).send({
                message: 'Usuario no autorizado'
            });
        }
    }
}