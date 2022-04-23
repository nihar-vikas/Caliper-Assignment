import express from 'express';
import { getVehiclesList, createVehicle, updateVehicle, deleteVehicle } from '../controllers/vehicle.js';

const router = express.Router();

router.get('/', getVehiclesList);

router.post('/', createVehicle);

router.put('/:id', updateVehicle);

router.delete('/:id', deleteVehicle);

export default router;