const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares');

const app = express();
// morgan can be used in production
app.use(morgan('common'));
// X-Powered-By header is gome
// Added X-XSS-Protection, X-Download-Option: noopen, X-Content-Type-Option: nosniff
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
}))

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  })
})

// Not found Middleware
app.use(middlewares.notFound);

// Errror handling middleware
app.use(middlewares.errorHanlder);

const port = process.env.PORT || 1337;  
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
}); 

