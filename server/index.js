const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const libratRoutes = require('./routes/librat');
const app = express();
require('dotenv').config();

app.use(express.json()); 
app.use(cors());

const port = process.env.PORT || 3000;


mongoose.connect('mongodb+srv://michailpa2003_db_user:9HLsv3ruTABTK2fa@michael.huzyxtq.mongodb.net/?retryWrites=true&w=majority&appName=michael')


app.use('/api', authRoutes);
app.use('/librat', libratRoutes);


app.listen(port, () => console.log(`Server started on port ${port}`));
