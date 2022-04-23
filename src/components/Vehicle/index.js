import React from "react";
import AddEditVehicleModel from "./AddEditVehicleModel";
import styles from "./styles.module.scss";
import ViewVehiclesList from "./ViewVehiclesList";

const Vehicle = () => {
    return (
        <div className={styles.vehiclePageMain}>
            <div className={styles.vehicleListMain}>
                <ViewVehiclesList />
            </div>
            <AddEditVehicleModel />
        </div>
    );
};

export default Vehicle;
