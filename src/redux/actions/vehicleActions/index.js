import { message } from 'antd';
import axiosInstance from '../../../services/axiosInstance';
import { SET_CREATING_OR_UPDATING_VEHICLE, SET_LOADING_VEHICLES, SET_OPEN_ADD_EDIT_MODEL, SET_UPDATE_VEHICLE_ITEM, SET_VEHICLES_LIST, SET_VEHICLE_MODEL_TYPE } from '../../reduser/vehicleReduser';

export const handleCloseModel = () => (dispatch) => {
    dispatch({ type: SET_VEHICLE_MODEL_TYPE, payload: '' });
    dispatch({ type: SET_OPEN_ADD_EDIT_MODEL, payload: false });
    dispatch({ type: SET_UPDATE_VEHICLE_ITEM, payload: {} });
}

export const fetchVehiclesList = (pageNo = 1) => async (dispatch) => {
    dispatch({ type: SET_LOADING_VEHICLES, payload: true });
    try {
        const { data } = await axiosInstance.get('vehicle?page=' + pageNo + '&page_size=10');
        dispatch({ type: SET_VEHICLES_LIST, payload: data });
    } catch (error) {
        message.error(error.response.data.message);
    } finally {
        dispatch({ type: SET_LOADING_VEHICLES, payload: false });
    }
}

export const addVehicalItem = (payload, pageNo) => async (dispatch) => {
    dispatch({ type: SET_CREATING_OR_UPDATING_VEHICLE, payload: true });
    try {
        const { data } = await axiosInstance.post('vehicle', { ...payload });
        message.success(data.message);
        dispatch(fetchVehiclesList(pageNo));
        dispatch(handleCloseModel());
    } catch (error) {
        message.error(error.response.data.message);
    } finally {
        dispatch({ type: SET_CREATING_OR_UPDATING_VEHICLE, payload: false });
    }
}

export const updateVehicalItem = (payload, pageNo) => async (dispatch) => {
    dispatch({ type: SET_CREATING_OR_UPDATING_VEHICLE, payload: true });
    try {
        const { data } = await axiosInstance.put(`vehicle/${payload._id}`, { ...payload });
        message.success(data.message);
        dispatch(handleCloseModel());
        dispatch(fetchVehiclesList(pageNo));
    } catch (error) {
        message.error(error.response.data.message);
    } finally {
        dispatch({ type: SET_CREATING_OR_UPDATING_VEHICLE, payload: false });
    }
}

export const deleteVehicleItem = (id, pageNo) => async (dispatch) => {
    dispatch({ type: SET_CREATING_OR_UPDATING_VEHICLE, payload: true });
    try {
        const { data } = await axiosInstance.delete(`vehicle/${id}`);
        message.success(data.message);
        dispatch(fetchVehiclesList(pageNo));
    } catch (error) {
        message.error(error.response.data.message);
    } finally {
        dispatch({ type: SET_CREATING_OR_UPDATING_VEHICLE, payload: false });
    }
}