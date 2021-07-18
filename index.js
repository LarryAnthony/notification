require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/notification', require('./routes/notificacion'))

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
	console.log(`Servidor conectado al puerto ${PORT}`);
	if (process.send) {
		process.send('ready');
	}
});