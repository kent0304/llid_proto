import React from 'react';
import Link from 'next/link';
import styles from "./Top.module.scss";


const Top = () => {
    return (
        <div>
            英文ライティング写真描画問題の練習webサイトです

            <div className={styles.next_button}> 
                <button
                    className={styles.button}
                >
                        <Link href="/question">問題はこちら</Link>
                </button>
            </div>
        
        </div>
    )
}

export default Top
