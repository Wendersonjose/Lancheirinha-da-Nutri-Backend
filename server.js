const express = require('express');
const cors = require('cors'); // Adicione o CORS
const productRoutes = require('./routes/productRoutes');
const path = require('path');
require('dotenv').config();


const app = express();
const port = 3000;

app.use(cors()); // Habilite o CORS para permitir requisições externas
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', productRoutes);

const db = require('./db');

const testConnection = async () => {
  try {
    // Apenas tenta se conectar ao banco para verificar a conexão
    await db.query('SELECT 1');
    console.log('Connected to PostgreSQL');
  } catch (err) {
    console.error('PostgreSQL connection error:', err);
  }
};


testConnection();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
 