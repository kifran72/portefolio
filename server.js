const app = require('./app');
const port = process.env.PORT || 8080;
// const port = process.env.PORT || 80;


app.listen(port, () => {
  console.log(`started on port: ${port}`);
});
