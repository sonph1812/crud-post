const express = require("express");
const app = express();
const mongoose = require('mongoose');


const PORT = 8000
const URL = "mongodb+srv://admin:admin123@cluster0.ndyjwui.mongodb.net/api"
app.use(express.json())

app.use('/api', require('./routes/authRoute'))
app.use('/api', require('./routes/userRoute'))
app.use('/api', require('./routes/postRoute'))


const connectDatabase = () => {
    mongoose.connect(URL)
        .then((data)=>{
            console.log('db connect success');
        }).catch((err)=>{
        console.log(err);
    })
}
connectDatabase();
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
