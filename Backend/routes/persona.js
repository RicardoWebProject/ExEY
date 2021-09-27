//Router
import routerx from 'express-promise-router';
//Controlador
import personaController from '../controllers/personaController';

const router = routerx();

//Endpoints
router.post('/add',personaController.add);
router.get('/query',personaController.query);
router.get('/list',personaController.list);
router.put('/update',personaController.update);
router.delete('/remove',personaController.remove);
router.put('/activate',personaController.activate);
router.put('/deactivate',personaController.deactivate);

export default router;