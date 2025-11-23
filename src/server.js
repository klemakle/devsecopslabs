const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
// ❌ VULNÉRABILITÉ 1 : Secret hardcodé
const SECRET = "my-secret-key";
app.use(express.json());
// ❌ VULNÉRABILITÉ 2 : Pas de validation
app.post('/api/login', (req, res) => {
 const { username, password } = req.body;

 if (username === 'admin' && password === 'admin123') {
 const token = jwt.sign({ username }, SECRET);
 res.json({ token });
 } else {
 res.status(401).json({ error: 'Invalid credentials' });
 }
});
// ❌ VULNÉRABILITÉ 3 : Endpoint de debug exposé
app.get('/debug', (req, res) => {
 res.json({ secret: SECRET, env: process.env });
});
app.listen(3000, () => console.log('Server running on port 3000'));
