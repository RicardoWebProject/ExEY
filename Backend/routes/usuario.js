//Router
import routerx from 'express-promise-router';
//Controlador Usuario
import usuarioController from '../controllers/UsuarioController';
//Autenticación
import auth from '../middlewares/auth';

const router=routerx();

router.post('/add', auth.verifyAdministrador, usuarioController.add);
router.get('/query', auth.verifyAdministrador, usuarioController.query);
router.get('/list', auth.verifyAdministrador, usuarioController.list);
router.patch('/update', auth.verifyAdministrador, usuarioController.update);
router.delete('/remove', auth.verifyAdministrador, usuarioController.remove);
router.patch('/activate', auth.verifyAdministrador, usuarioController.activate);
router.patch('/deactivate', auth.verifyAdministrador, usuarioController.deactivate);
router.post('/login', usuarioController.login);

export default router;