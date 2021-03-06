// Should be the last midddleware that you want to listen to 
// IF the app ends here that means we didnt get he route we were looking for
const notFound = (req, res, next) => {
  // Create the error
  const error = new Error(`Not Found - ${req.originalUrl}`);
  //Set the status to 404
  // Forward the error to next middleware
  next(error);
}

const errorHandler = (error, req, res, next) => {
  console.log('statusCode', res.statusCode);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.log('statusCode', statusCode);
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🐞' : error.stack
  })
}

module.exports = { notFound, errorHandler };