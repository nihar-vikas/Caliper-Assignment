import React from "react";
import styles from "./styles.module.scss";
import Logo from '../../assets/logo.png';

const Header = () => {
    return (
        <div className={styles.mainHeader}>
            <div className={styles.headerContent}>
                <img src={Logo} alt="logo" />
            </div>
        </div>
    );
};

export default Header;
