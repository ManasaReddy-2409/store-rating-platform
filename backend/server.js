const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows parsing of JSON request bodies

// Routes
const authRoutes = require('./src/routes/authRoutes');
// const adminRoutes = require('./src/routes/adminRoutes'); // Uncomment later
// const userRoutes = require('./src/routes/userRoutes'); // Uncomment later
// const storeOwnerRoutes = require('./src/routes/storeOwnerRoutes'); // Uncomment later

app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes); // Uncomment later
// app.use('/api/users', userRoutes); // Uncomment later
// app.use('/api/store-owner', storeOwnerRoutes); // Uncomment later

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});