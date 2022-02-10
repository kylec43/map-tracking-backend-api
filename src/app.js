const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const User = require('./models/User');
const requireAuth = require('./middlewares/requireAuth');
require('dotenv').config();

mongoUri = process.env.DB_URI;
mongoose.connect(mongoUri);
mongoose.connection.on('connected', () => {
	console.log("connected to mongo instance");
});

mongoose.connection.on('error', (err) => {
	console.log("Error connection to mongo", err);
});

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

app.get("/", requireAuth, (req, res) => {
	res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
	console.log("Server Started");
});
