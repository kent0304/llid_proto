import React from 'react';
import Link from 'next/link';
import styles from "./Top.module.scss";


const Top = () => {
    return (
        <div>
            <p>問題番号を選択してください．</p>

            <ul className={styles.buttonlist}>
                <li>
                    <button className={styles.button}>
                            <Link href="/question">問題1</Link>
                    </button>
                </li>
                <li>
                    <button className={styles.button}>
                            <Link href="/question2">問題2</Link>
                    </button>
                </li>
                <li>
                    <button className={styles.button}>
                        <Link href="/question3">問題3</Link>
                    </button>
                </li>
                <li>
                    <button className={styles.button}>
                        <Link href="/question4">問題4</Link>
                    </button>
                </li>
            </ul>
            
        
        </div>
    )
}

export default Top
