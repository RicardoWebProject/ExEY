import routerx from 'express-promise-router';
import personaRouter from './persona';
import usuarioRouter from './usuario';

const router = routerx();

router.use('/persona', personaRouter);
router.use('/usuario', usuarioRouter);

export default router;