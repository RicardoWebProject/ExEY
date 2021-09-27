//Router
import routerx from 'express-promise-router';
//Controlador
import personaController from '../controllers/personaController';
//Autenticación
import auth from '../middlewares/auth';

const router = routerx();

//Endpoints
router.post('/add', auth.verifyUsuario, personaController.add);
router.get('/query', auth.verifyUsuario, personaController.query);
router.get('/list', auth.verifyUsuario, personaController.list);
router.patch('/update', auth.verifyUsuario, personaController.update);
router.delete('/remove', auth.verifyUsuario, personaController.remove);
router.patch('/activate', auth.verifyUsuario, personaController.activate);
router.patch('/deactivate', auth.verifyUsuario, personaController.deactivate);

export default router;