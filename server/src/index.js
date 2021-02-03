const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares');
const logs = require('./api/logs')

require('dotenv').config({ path: './../.env' });
const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// morgan can be used in production
app.use(morgan('common'));
// X-Powered-By header is gome
// Added X-XSS-Protection, X-Download-Option: noopen, X-Content-Type-Option: nosniff
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}))
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  })
})

app.use('/api/logs', logs);

// Not found Middleware
app.use(middlewares.notFound);
// Errror handling middleware
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;  
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
}); 

