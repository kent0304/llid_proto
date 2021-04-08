import React from 'react';
import styles from "./Header.module.scss";

const Header = () => {
    return (
        <div className={styles.header_container}>
            <h1 className={styles.header_title}>Picture Description</h1>
            <nav className={styles.header_list}>
                <ul>
                    <li>
                        Home
                    </li>
                    <li>
                        My Page
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header
