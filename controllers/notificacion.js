const { pool, poolEnv } = require('../database/config');
const push = require('./push');
const webpush = require('web-push');

const pushNoti = async (req, res) => {
	const notificacion = {
		titulo: req.body.titulo,
		cuerpo: req.body.cuerpo,
		usuario: req.body.usuario
	}
	try {
		const pushData = await (await pool.query({ text: 'SELECT id, notificacion FROM larryjacobo.suscripciones;' })).rows;
		pushData.forEach(async (suscripcion, i) => {
			try {
				await webpush.sendNotification(suscripcion.notificacion, JSON.stringify(notificacion))
				console.log('Notificación enviada', i)
			} catch (error) {

				console.log('Error falló', i)
				if (error.statusCode === 410) {
					await pool.query({ text: 'DELETE FROM larryjacobo.suscripciones WHERE id=$1;', values: [suscripcion.id] })
				}
			}
		});
		return res.status(200).json({
			ok: true,
			msg: 'Notificación enviada'
		});
	} catch (error) {
		return res.status(500).json({
			ok: false,
			msg: 'Problemas de conexión'
		});
	}
}

const pushNotiEnt = (req, res) => {
	return res.status(200).json({
		ok: true,
		msg: 'Notificación enviada-ent'
	})
}

// Almacenar la subscripción
const subscribe = async (req, res) => {
	const suscripcion = req.body;
	console.log(suscripcion)
	try {
		// push.addSubscription(suscripcion);
		await pool.query({ text: 'INSERT INTO larryjacobo.suscripciones(notificacion) VALUES ($1);', values: [suscripcion] });
		res.status(200).json({
			ok: true,
			msg: 'Suscripción registrada'
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Problemas de conexión'
		});
	}
}
const subscribeEnt = (req, res) => {
	return res.status(200).json({
		ok: true,
		msg: 'subscribe-ent'
	})
}
// Obtener el key de usuario
const obtenerKey = (req, res) => {
	const key = push.getKey();
	return res.status(200).send(key)
}
const obtenerKeyEnt = (req, res) => {
	return res.status(200).json({
		ok: true,
		msg: 'Key públic-ent'
	})
}
module.exports = {
	pushNoti,
	pushNotiEnt,
	subscribe,
	subscribeEnt,
	obtenerKey,
	obtenerKeyEnt
}