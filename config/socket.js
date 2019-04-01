module.exports = (io) => {
  io.on('connection', function(socket) {
    console.log('user connected');
  });

  io.on('disconnect', function(socket) {
    console.log('user disconnected');
  });
};


