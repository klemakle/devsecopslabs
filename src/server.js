const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
// ❌ VULNÉRABILITÉ 1 : Secret hardcodé (clé API AWS exemple)
const SECRET = "AKIAIOSFODNN7EXAMPLE";
const JWT_SECRET = "super-secret-jwt-key-12345";
app.use(express.json());
// ❌ VULNÉRABILITÉ 2 : Pas de validation
app.post('/api/login', (req, res) => {
 const { username, password } = req.body;

 if (username === 'admin' && password === 'admin123') {
 const token = jwt.sign({ username }, JWT_SECRET);
 res.json({ token });
 } else {
 res.status(401).json({ error: 'Invalid credentials' });
 }
});
// ❌ VULNÉRABILITÉ 3 : Endpoint de debug exposé
app.get('/debug', (req, res) => {
 res.json({ awsKey: SECRET, jwtSecret: JWT_SECRET, env: process.env });
});
app.listen(3000, () => console.log('Server running on port 3000'));
