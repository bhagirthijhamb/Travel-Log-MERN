const express = require('express');
const router = express.Router();
const LogEntry = require('./../models/LogEntry');

router.get('/', (req, res) => {
  res.json({
    message: '🌎',
  })
})

router.post('/', async(req, res, next) => {
  try {
     // console.log(req.body);
    const logEntry = new LogEntry( req.body );
    const createdEntry =  await logEntry.save();
    res.json(createdEntry);
  } catch(error){
    console.log('error-name', error.name);
    if(error.name === 'ValidationError'){
      // 422 - the server understands the content type of the request entity and th syntax of the request entity is correct but was unable to processs the contained instructions
      res.status(422); 
    }
    next(error);
  }
})

module.exports = router