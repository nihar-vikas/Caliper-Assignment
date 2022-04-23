import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import vehicleRoutes from './routes/vehicle.js';

const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/vehicle', vehicleRoutes);

const CONNECTION_URL = 'mongodb+srv://nihar:nihar123@cluster0.ky7hv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) })
    .catch(err => console.log(err.message));
// mongoose.set('useFindAndModify', false);