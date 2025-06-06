const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

// mongodb connection
mongoose.connect(process.env.MONGO_URL)

.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
// simple route
app.get('/', (req,res) =>{
    res.send('To-Do api is running ....');
});

const appRoutes = require('./routes/auth')
app.use('/api/auth',appRoutes)

const todoRoutes = require('./routes/todo');
app.use('/api/todos', todoRoutes);


app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

