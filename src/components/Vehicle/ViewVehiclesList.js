import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { CaretDownOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { deleteVehicleItem, fetchVehiclesList } from "../../redux/actions/vehicleActions";
import { Button, Pagination, Popconfirm, Spin } from "antd";
import { SET_OPEN_ADD_EDIT_MODEL, SET_UPDATE_VEHICLE_ITEM, SET_VEHICLE_MODEL_TYPE } from "../../redux/reduser/vehicleReduser";

const ViewVehiclesList = () => {
    const dispatch = useDispatch();
    const vehiclesList = useSelector(state => state?.vehicle?.vehiclesList);
    const tableListLoading = useSelector(state => state?.vehicle?.fetchingVehicles);
    const isLoading = useSelector(state => state?.vehicle?.creatingOrUpdatingVehicle);
    const selectedItemToDelete = useSelector(state => state?.vehicle?.updateVehicleItem);

    useEffect(() => {
        if (vehiclesList?.length === 0 || vehiclesList?.result?.length === 0) {
            dispatch(fetchVehiclesList());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = (item) => {
        dispatch({ type: SET_UPDATE_VEHICLE_ITEM, payload: item });
        const pageNumber = vehiclesList?.result?.length === 1 ? parseInt(vehiclesList?.current_page, 10) - 1 : vehiclesList?.current_page;
        dispatch(deleteVehicleItem(item?._id, pageNumber));
    }

    const handleAddUpdate = (type, vehicleRecord) => {
        dispatch({ type: SET_UPDATE_VEHICLE_ITEM, payload: vehicleRecord });
        dispatch({ type: SET_OPEN_ADD_EDIT_MODEL, payload: true });
        dispatch({ type: SET_VEHICLE_MODEL_TYPE, payload: type });
    }

    const handlePagination = (pageNo) => {
        dispatch(fetchVehiclesList(pageNo));
    }

    return (
        <div className={styles.viewVehiclesListMain}>
            <div className={styles.viewVehiclesListHeader}>
                <h6 className={styles.viewVehiclesListHeaderLabel}>Late Delivery</h6>
                <CaretDownOutlined className={styles.viewVehiclesListHeaderIcon} />
            </div>
            <Spin spinning={tableListLoading} tip="Loading...">
                <div className={styles.viewVehiclesListTableDiv}>
                    {(vehiclesList?.result?.length === 0 || vehiclesList?.length === 0) ? (
                        <h6 className={styles.emptyMessage}>No Records are added</h6>
                    ) : (
                        <table className={styles.viewVehiclesListTable}>
                            <thead className={`${styles.viewVehiclesListTableHeader} ${styles.fixPosition}`}>
                                <tr className={styles.viewVehiclesListTableHeaderRow}>
                                    <th className={styles.viewVehiclesListTableHeader}>Vehicle Type</th>
                                    <th className={styles.viewVehiclesListTableHeader}>Amount</th>
                                    <th className={styles.viewVehiclesListTableHeader}>Grace</th>
                                    <th className={styles.viewVehiclesListTableHeader}>Action</th>
                                </tr>
                            </thead>
                            <tbody className={styles.viewVehiclesListTableHeader}>
                                {vehiclesList?.result?.map((item) => (
                                    <tr className={`${styles.viewVehiclesListTableHeaderRow} ${styles.showHover}`} key={item?._id}>
                                        <td className={`${styles.viewVehiclesListTableHeader} ${styles.fontLight}`}>{item?.vehicle_type}</td>
                                        <td className={`${styles.viewVehiclesListTableHeader} ${styles.fontLight}`}>{item?.amount}/{item?.amount_uom}</td>
                                        <td className={`${styles.viewVehiclesListTableHeader} ${styles.fontLight}`}>{item?.grace} {item?.grace > 1 ? item?.grace_uom + 's' : item?.grace_uom}</td>
                                        <td className={`${styles.viewVehiclesListTableHeader} ${styles.fontLight}`}>
                                            <div className={styles.actionButtons}>
                                                <EditOutlined className={styles.editIcon} onClick={() => handleAddUpdate('Edit', item)} />
                                                <Popconfirm
                                                    title="Are you sure to delete this?"
                                                    onConfirm={() => handleDelete(item)}
                                                    okText="Yes"
                                                    cancelText="No"
                                                    loading={selectedItemToDelete?._id === item?._id ? isLoading : ''}
                                                >
                                                    <DeleteOutlined className={styles.deleteIcon} />
                                                </Popconfirm>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </Spin>
            <div className={styles.paginatorContainer}>
                <Pagination onChange={handlePagination} current={vehiclesList?.current_page} total={vehiclesList?.total_pages * 10} />
                <Button className={styles.footerAddButton} onClick={() => handleAddUpdate('Add')}>Add</Button>
            </div>
        </div >
    );
};

export default ViewVehiclesList;
