const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const app = express();
const routers = require('./controller/router/convort')



app.use(cors());


app.use('/api',routers)







app.listen(5000,()=>{
    console.log('server is running on port 5000')
})