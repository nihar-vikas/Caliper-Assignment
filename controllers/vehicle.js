import VehicleList from "../models/vehicleModel.js";
import mongoose from 'mongoose';

export const getVehiclesList = async (req, res) => {
    const { page, page_size, searchQuery } = req.query
    const title = typeof (searchQuery) === 'string' ? new RegExp(searchQuery, 'i') : '';
    try {
        const LIMIT = Number(page_size);
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await VehicleList.countDocuments({});
        let posts = [];
        if (title) {
            posts = await VehicleList.find({ title }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        } else {
            posts = await VehicleList.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        }
        res.status(200).json({ result: posts, current_page: Number(page), total_pages: Math.ceil(total / LIMIT), total_records: total });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createVehicle = async (req, res) => {
    const vehicle = req.body;
    const newVehicle = new VehicleList(vehicle);
    try {
        await newVehicle.save();
        res.status(201).json({ message: 'Vehicle created successfully', data: newVehicle });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const updateVehicle = async (req, res) => {
    const { id: _id } = req.params;
    const vehicle = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No vehicle with this id');
    try {
        const updatedVehicle = await VehicleList.findByIdAndUpdate(_id, vehicle);
        res.json({ message: 'Vehicle details updated successfully', data: updatedVehicle });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const deleteVehicle = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No vehicle found with this id');
    try {
        await VehicleList.findByIdAndRemove(id);
        res.json({ message: 'Vehicle deleted successfully' });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}