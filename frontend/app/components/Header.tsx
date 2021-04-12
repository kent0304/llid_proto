import React from 'react';
import styles from "./Header.module.scss";
import Link from 'next/link';

const Header = () => {
    return (
        <div className={styles.header_container}>
            <Link href="/">
                <h1 className={styles.header_title}>Picture Description</h1>
            </Link>
            <nav className={styles.header_list}>
                <ul>
                    <li>
                    <Link href="/">
                        Home
                    </Link>
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
