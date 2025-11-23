const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// ❌ VULNÉRABILITÉ 1 : Secret hardcodé
const DB_CONNECTION = "mongodb://admin:SuperSecret123!@prod-db.company.com:27017/myapp";
const STRIPE_SECRET_KEY = "sk_live_51Hqp9K2eZvKYlo2C8xO3n4y5z6a7b8c9d0e1f2g3h4i5Z";
const SENDGRID_API_KEY = "SG.nExT2-QRDzJcEV39HqCxTg.KnLmOpQrStUvWxYz1234567890aBcDeF";
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
 res.json({
    dbConnection: DB_CONNECTION,
    stripeKey: STRIPE_SECRET_KEY,
    sendgridKey: SENDGRID_API_KEY,
    env: process.env
  });
});
app.listen(3000, () => console.log('Server running on port 3000'));
