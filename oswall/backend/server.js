const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Authentication routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Protected sites routes
const protectedSitesRoutes = require('./routes/protectedSites');
app.use('/api/sites', protectedSitesRoutes);

// Blocked IPs routes
const blockedIPsRoutes = require('./routes/blockedIP');
app.use('/api/blocked-ips', blockedIPsRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('OsWall backend runing');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});