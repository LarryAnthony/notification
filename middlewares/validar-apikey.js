require('dotenv').config();

const validarApikey = (req, res, next) => {
	const apikey = req.header('api-key');
	const apikeyEnv = process.env.API_KEY;
	if (!apikey)
		return res.status(400).json({
			ok: false,
			msg: 'Favor enviar apikey'
		});
	try {
		if (apikey !== apikeyEnv) {
			return res.status(400).json({
				ok: false,
				msg: 'Apikey incorrecto'
			});;
		}
	} catch (error) {
		return res.status(402).json({
			ok: false,
			msg: 'Problemas con el apikey enviado'
		});
	}
	next();
}

module.exports = {
	validarApikey
}