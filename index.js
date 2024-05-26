const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const { db } = require('./configs/config.db')
require('dotenv').config()
const routes = require('./routes/index')
let port = process.env.PORT || 3000
// app.get('/', (req, res)=>{
//   res.send('helo world')
// })
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
/**************cors orgin*************/
app.use(cors());
app.all("/*", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});
db()

app.use('/api', routes);

app.listen(port, ()=>{
    console.log("SERVER IS RUNNING ON PORT ", port)
})
