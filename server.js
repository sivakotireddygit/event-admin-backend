const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

/* DATABASE */
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

/* MODELS */
const Admin = sequelize.define('Admin', {
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
});

const User = sequelize.define('User', { name: DataTypes.STRING, status: DataTypes.STRING });
const Organizer = sequelize.define('Organizer', { name: DataTypes.STRING, status: DataTypes.STRING });
const Event = sequelize.define('Event', { title: DataTypes.STRING, status: DataTypes.STRING });
const Booking = sequelize.define('Booking', { amount: DataTypes.FLOAT });

/* AUTH */
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    jwt.verify(token, 'secret123');
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

/* ROUTES */

// seed admin
app.get('/api/seed-admin', async (_, res) => {
  const hash = await bcrypt.hash('123456', 10);
  await Admin.findOrCreate({
    where: { email: 'admin@mail.com' },
    defaults: { password: hash },
  });
  res.json({ message: 'Admin created (admin@mail.com / 123456)' });
});

// login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ where: { email } });
  if (!admin) return res.status(404).json({ message: 'Admin not found' });

  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) return res.status(400).json({ message: 'Wrong password' });

  const token = jwt.sign({ id: admin.id }, 'secret123', { expiresIn: '1d' });
  res.json({ token });
});

// dashboard
app.get('/api/dashboard', auth, async (_, res) => {
  res.json({
    users: await User.count(),
    organizers: await Organizer.count(),
    events: await Event.count(),
    bookings: await Booking.count(),
  });
});

/* START SERVER */
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

