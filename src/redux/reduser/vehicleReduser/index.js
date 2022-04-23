const initialState = {
    vehiclesList: [],
    fetchingVehicles: false,
    openAddEditVehicleModel: false,
    creatingOrUpdatingVehicle: false,
    vehicleModelType: '',
    updateVehicleItem: {},
    UOMList: [
        { id: 1, label: 'Hour', value: 'Hour' },
        { id: 2, label: 'Day', value: 'Day' },
    ],
    vehiclesType: [
        { id: 1, label: '3 Wheeler 550Kgs - 4 ft 8 inch Long' },
        { id: 2, label: '4 Wheeler 1550Kgs - 8 ft 18 inch Long' },
        { id: 3, label: '2 Wheeler 550Kgs - 3 ft 10 inch Long' },
        { id: 4, label: '8 Wheeler 5000Kgs - 10 ft 28 inch Long' },
    ],
}

export const SET_VEHICLES_LIST = 'SET_VEHICLES_LIST';
export const SET_LOADING_VEHICLES = 'SET_LOADING_VEHICLES';
export const SET_OPEN_ADD_EDIT_MODEL = 'SET_OPEN_ADD_EDIT_MODEL';
export const SET_CREATING_OR_UPDATING_VEHICLE = 'SET_CREATING_OR_UPDATING_VEHICLE';
export const SET_VEHICLE_MODEL_TYPE = 'SET_VEHICLE_MODEL_TYPE';
export const SET_UPDATE_VEHICLE_ITEM = 'SET_UPDATE_VEHICLE_ITEM';

const VehicleReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_VEHICLES_LIST:
            return { ...state, vehiclesList: action.payload }
        case SET_LOADING_VEHICLES:
            return { ...state, fetchingVehicles: action.payload }
        case SET_OPEN_ADD_EDIT_MODEL:
            return { ...state, openAddEditVehicleModel: action.payload }
        case SET_CREATING_OR_UPDATING_VEHICLE:
            return { ...state, creatingOrUpdatingVehicle: action.payload }
        case SET_VEHICLE_MODEL_TYPE:
            return { ...state, vehicleModelType: action.payload }
        case SET_UPDATE_VEHICLE_ITEM:
            return { ...state, updateVehicleItem: action.payload }
        default:
            return state
    }
}

export default VehicleReduser;