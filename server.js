const app = require('./app')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
require('dotenv').config()


mongoose.connect(process.env.MONGODB_CLOUD_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("\nDatabase Connected");
    app.listen(port, () => console.log(`SERVER LISTENING AT PORT ${port}\n`));
  })
  .catch((e) => {
    console.log("\nError while connecting to Database!");
    console.log(e)
});