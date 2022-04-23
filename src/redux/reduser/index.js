import { combineReducers } from 'redux';
import VehicleReduser from "./vehicleReduser";

const rootReducer = combineReducers({
    vehicle: VehicleReduser,
});

export default rootReducer;