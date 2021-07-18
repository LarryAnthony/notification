const vapid = require('../routes/vapid.json');
const urlsafeBase64 = require('urlsafe-base64');
const webpush = require('web-push');

const suscripciones = [];

webpush.setVapidDetails(
	'mailto:ajacobozare@gmail.com',
	vapid.publicKey,
	vapid.privateKey
);

module.exports.getKey = () => {
	return urlsafeBase64.decode(vapid.publicKey);
};

module.exports.addSubscription = (suscripcion) => {
	suscripciones.push(suscripcion);

	console.log(suscripciones);
}
module.exports.suscripciones;

module.exports.sendPush = (post) => {

}