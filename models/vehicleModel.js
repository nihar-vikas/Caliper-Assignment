import mongoose from "mongoose";

const vehicleSchema = mongoose.Schema({
    vehicle_type: String,
    grace: Number,
    grace_uom: String,
    amount: Number,
    amount_uom: String,
});

const VehicleList = mongoose.model("VehicleList", vehicleSchema);

export default VehicleList;