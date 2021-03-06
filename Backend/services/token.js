//Token
import jwt from 'jsonwebtoken';
//Modelos
import models from '../models';

//Si ya expiró el token, puede generar uno nuevo a partir del antiguo, si es que era válido.
async function checkToken(token){
    let __id = null;
    try {
        const {_id} = await jwt.decode(token);
        __id = _id;
    } catch (error) {
        return false;
    }

    const user = await models.Usuario.findOne({_id:__id, estado:1});
    
    if (user){
        const token = jwt.sign({_id: __id}, 'clavesecreta', {expiresIn:'1d'});
        return {token, rol: user.rol};
    } else {
        return false;
    }
}
//--------------------------------------------------------------------------------------------

export default {
    //GENERAR TOKEN
    encode: async (_id) => {
        const token = jwt.sign({_id: _id}, 'clavesecreta', {expiresIn: '1d'});
        return token;
    },

    //DECODIFICAR TOKEN DE ALGÚN USUARIO
    decode: async (token) => {
        try {
            const {_id} = await jwt.verify(token, 'clavesecreta');
            const user = await models.Usuario.findOne({_id, estado: 1});

            if (user) {
                return user;
            } else {
                return false;
            }

        } catch (error) {
            const newToken = await checkToken(token);
            return newToken;
        }
    }
}