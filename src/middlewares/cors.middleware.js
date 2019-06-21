function setCorsOptions() {
  let whitelist = ['http://localhost:3000', 'localhost:3000', 'https://gestion-park.herokuapp.com'];

  return {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
}



module.exports = { setCorsOptions };