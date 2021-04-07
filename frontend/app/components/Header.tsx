import React from 'react';
import styles from "./Header.module.scss";

const Header = () => {
    return (
        <div className={styles.header_container}>
            <h1>写真描画問題</h1>

            <ul className={styles.header_list}>
                <li>
                    マイページ
                </li>
                <li>
                    ホーム
                </li>
            </ul>
        </div>
    )
}

export default Header
