const { Router } = require('express');
const { pushNoti, pushNotiEnt, subscribe, subscribeEnt, obtenerKey, obtenerKeyEnt } = require('../controllers/notificacion');
const { validarApikey } = require('../middlewares/validar-apikey');

const router = Router();
router.post('/subscribe', validarApikey, subscribe);
router.post('/subscribe-ent', validarApikey, subscribeEnt);
router.post('/push', validarApikey, pushNoti);
router.post('/push-ent', validarApikey, pushNotiEnt);
router.get('/key', validarApikey, obtenerKey);
router.get('/key-ent', validarApikey, obtenerKeyEnt);

module.exports = router;