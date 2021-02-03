const express = require('express');
const router = express.Router();
const LogEntry = require('./../models/LogEntry');
const { API_KEY } = process.env;


router.get('/', async(req, res, next) => {
  try {
    // res.json({
    //   message: '🌎',
    // })
    const entries = await LogEntry.find();
    res.json(entries);
  } catch(error){
    next(error);
  }
})

router.post('/', async(req, res, next) => {
  try {
     // console.log(req.body);
    //  console.log('hello...')
    //  console.log(process.env.PORT)
    //  console.log(process.env.API_KEY)
     console.log(req.get('X-API-KEY'), process.env.API_KEY);
    if(req.get('X-API-KEY') !== process.env.API_KEY){
      // res.status(401);
      throw new Error('UnAuthorised');
    }
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