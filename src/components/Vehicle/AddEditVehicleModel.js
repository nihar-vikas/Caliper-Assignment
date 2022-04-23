import React, { useState, useEffect } from "react";
import { Modal, InputNumber, Select, Button, Popconfirm } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import styles from './styles.module.scss';
import { addVehicalItem, handleCloseModel, updateVehicalItem } from "../../redux/actions/vehicleActions";

export const LabelInputCard = ({ label, children, helperText, status }) => {
    return (
        <div className={styles.formInput}>
            <h6 className={styles.inputLabel}>{label} *</h6>
            <div className={styles.inputElement}>
                {children}
            </div>
            {status ? <h6 className={styles.helperText}>{helperText}</h6> : null}
        </div>
    )
}

const AddEditVehicleModel = () => {
    const { Option } = Select;
    const dispatch = useDispatch();
    const UOMList = useSelector(state => state.vehicle.UOMList);
    const vehiclesTypeList = useSelector(state => state.vehicle.vehiclesType);
    const vehiclesList = useSelector(state => state?.vehicle?.vehiclesList);
    const modelStatus = useSelector(state => state?.vehicle?.openAddEditVehicleModel);
    const modelType = useSelector(state => state?.vehicle?.vehicleModelType);
    const isLoading = useSelector(state => state?.vehicle?.creatingOrUpdatingVehicle);
    const selectedItemToUpdate = useSelector(state => state?.vehicle?.updateVehicleItem);
    const [fromErrors, setFromErrors] = useState({});
    const [formData, setFormData] = useState({});

    const handleFieldError = (key, value) => {
        setFromErrors((prev) => ({ ...prev, [key]: value }));
    }

    const handleFormData = (key, value) => {
        setFormData((prevState) => ({ ...prevState, [key]: value }));
        handleFieldError(key, false);
    }

    const handleClose = () => {
        dispatch(handleCloseModel());
    }

    useEffect(() => {
        if (selectedItemToUpdate && modelStatus && modelType === 'Edit') {
            setFormData({ ...selectedItemToUpdate });
        } else {
            setFromErrors({ vehicle_type: false, grace: false, grace_uom: false, amount: false, amount_uom: false });
            setFormData({ vehicle_type: undefined, grace: '', grace_uom: undefined, amount: '', amount_uom: undefined });
        }
    }, [selectedItemToUpdate, modelStatus, modelType]);

    const SelectUOMDropDown = ({ inputKey }) => {
        return (
            <Select status={fromErrors?.[inputKey] ? 'error' : ''} allowClear placeholder="UOM" className={styles.selectInput} value={formData?.[inputKey]} onChange={(value) => handleFormData(inputKey, value)}>
                {UOMList.map((item) => (
                    <Option key={item.id} value={item.value}>{item.label}</Option>
                ))}
            </Select>
        )
    }

    // const NumberInput = ({ inputKey }) => {
    //     return (
    //         <InputNumber controls={false} bordered={fromErrors?.[inputKey]} status={fromErrors?.[inputKey] ? 'error' : ''} className={styles.inputNumber} value={formData?.[inputKey]} onChange={(value) => handleFormData(inputKey, value)} />
    //     )
    // }

    const handleSubmit = () => {
        let count = 0;
        if (formData?.vehicle_type === undefined) {
            handleFieldError('vehicle_type', true);
            count += 1;
        }
        if (!formData?.grace) {
            count += 1;
            handleFieldError('grace', true);
        }
        if (formData?.grace_uom === undefined) {
            count += 1;
            handleFieldError('grace_uom', true);
        }
        if (!formData?.amount) {
            count += 1;
            handleFieldError('amount', true);
        }
        if (formData?.amount_uom === undefined) {
            count += 1;
            handleFieldError('amount_uom', true);
        }
        if (count === 0) {
            if (modelType === 'Add') {
                let pageNumber = 1;
                if (vehiclesList?.current_page === vehiclesList?.total_pages && vehiclesList?.result?.length === 10) {
                    pageNumber = parseInt(vehiclesList?.current_page, 10) + 1;
                } else {
                    pageNumber = Math.ceil((vehiclesList?.total_records + 1) / 10);
                }
                dispatch(addVehicalItem(formData, pageNumber));
            } else {
                dispatch(updateVehicalItem(formData, vehiclesList?.current_page));
            }
        }
    }

    return (
        <Modal
            title=""
            closable={false}
            visible={modelStatus}
            footer={null}
            centered
            bodyStyle={{
                padding: '0px',
                height: '100%',
                borderRadius: '20px',
            }}
            width={1000}
        >
            <div className={styles.addEditModelCard}>
                <h6 className={styles.modleTitle}>{`${modelType} Event`}</h6>
                <div className={styles.formInputItems}>
                    <LabelInputCard status={fromErrors?.vehicle_type ? 'error' : ''} helperText="Please select Vehicle Type" label="Vehicle Type">
                        <Select status={fromErrors?.vehicle_type ? 'error' : ''} allowClear placeholder="Vehicle Type" className={styles.selectInput} value={formData?.vehicle_type} onChange={(value) => handleFormData('vehicle_type', value)}>
                            {vehiclesTypeList.map((item) => (
                                <Option key={item.id} value={item.label}>{item.label}</Option>
                            ))}
                        </Select>
                    </LabelInputCard>
                    <LabelInputCard status={fromErrors?.grace ? 'error' : ''} helperText="Please enter Grace" label="Grace">
                        <InputNumber status={fromErrors?.grace ? 'error' : ''} type="number" controls={false} bordered={fromErrors?.grace} className={styles.inputNumber} value={formData?.grace} onChange={(value) => handleFormData('grace', value)} />
                        {/* <NumberInput inputKey="grace" /> */}
                    </LabelInputCard>
                    <LabelInputCard status={fromErrors?.grace_uom ? 'error' : ''} helperText="Please select UOM" label="UOM">
                        <SelectUOMDropDown inputKey="grace_uom" />
                    </LabelInputCard>
                    <LabelInputCard status={fromErrors?.amount ? 'error' : ''} helperText="Please enter Amount" label="Amount">
                        <InputNumber status={fromErrors?.amount ? 'error' : ''} type="number" controls={false} bordered={fromErrors?.amount} className={styles.inputNumber} value={formData?.amount} onChange={(value) => handleFormData('amount', value)} />
                        {/* <NumberInput inputKey="amount" /> */}
                    </LabelInputCard>
                    <LabelInputCard status={fromErrors?.amount_uom ? 'error' : ''} helperText="Please select UOM" label="UOM">
                        <SelectUOMDropDown inputKey="amount_uom" />
                    </LabelInputCard>
                </div>
                <div className={styles.footerButtons}>
                    <Popconfirm
                        title="Are you sure to close?"
                        onConfirm={handleClose}
                    >
                        <Button className={styles.footerActionButtons}>Close</Button>
                    </Popconfirm>
                    <Button className={styles.footerActionButtons} loading={isLoading} onClick={handleSubmit}>Save</Button>
                </div>
            </div>
        </Modal>
    );
};

export default AddEditVehicleModel;
