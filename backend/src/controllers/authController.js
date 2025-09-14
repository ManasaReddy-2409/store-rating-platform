const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const validate = require('../utils/validation');

const signup = async (req, res) => {
    const { name, email, password, address } = req.body;
    
    // Validate inputs
    if (!validate.name(name) || !validate.email(email) || !validate.password(password) || !validate.address(address)) {
        return res.status(400).json({ message: 'Invalid input data.' });
    }
    
    try {
        // Check if user already exists
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'Email already registered.' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert user into database as a 'normal_user'
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashedPassword, address, 'normal_user']
        );
        
        res.status(201).json({ message: 'User registered successfully.' });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during signup.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Find user by email
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        
        // Create and sign JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.status(200).json({ token, role: user.role });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during login.' });
    }
};

module.exports = { signup, login };