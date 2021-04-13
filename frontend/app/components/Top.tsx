import React from 'react';
import Link from 'next/link';
import Submit from "./Submit";
import styles from "./Top.module.scss";


const Top = () => {
    return (
        <div>
            英文ライティング写真描画問題の練習webサイトです

            <div className={styles.next_button}>
                <Submit content="問題はこちら" link="question"/>
            </div>
        
        </div>
    )
}

export default Top
