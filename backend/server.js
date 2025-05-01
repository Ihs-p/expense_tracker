require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB  = require('./config/db')

const app = express();


app.use(
    cors({
        origin:process.env.CLIENT_URL || '*',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:[
        'content-type','Authorization'
        ]
         
    })
);

app.use(express.json())
const PORT   = process.env.PORT || 5000

connectDB()

app.use('/api/v1/auth',require('./routes/authRoutes'))
app.use('/api/v1/income',require('./routes/incomeRoutes'))
app.use('/api/v1/expense',require('./routes/expenseRoutes'))
app.use('/api/v1/dashboard',require('./routes/dashboardRoutes'))


// serve static files 

app.use('/uploads',express.static(path.join(__dirname,"uploads")))

app.listen(PORT,()=>{
    console.log(`server running on port:${PORT}`)
})

