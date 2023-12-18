const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const authRouter = require('./authRouter');

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://Kostiantyn:2012Dead@cluster0.pbhucri.mongodb.net/test_pr')
    app.listen(port, () => {console.log( 'start server on port 3000' )})
  } catch (err) {
    console.log(err)
  }
}
  
start()





























