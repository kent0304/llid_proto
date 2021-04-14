import React, { useState } from 'react';
import styles from "./Answer.module.scss";
import Image from "next/image";
import Submit from "./Submit";


type Answer = {
    orig: string 
    result: string
    onHandler: VoidFunction
}

const Answer = ({ orig, result, onHandler }: Answer ) => {
    const [answer, setAnswer] = useState("");
    const [showGECButton, setShowGECButton] = useState(true);
    const onGECHandler = () => {
        setShowGECButton(false);
    };
    return (
        <div>
           
            <div className={styles.answer_page}>
                <div className={styles.question_card}>
                    <div className={styles.question_title}>
                        <h2>Question1</h2>
                        <div className={styles.direction}>
                            <h3>Directions: Write ONE sentence based on the picture. Use the TWO words or phrases under the picture. 
                                You may change the forms of the words and you may use them in any order.
                            </h3>
                        </div>
                        <div className={styles.question_image}>
                            <Image 
                                src={"/images/000000006894.jpg"}
                                alt={"question image"}
                                width={358}
                                height={269}
                            />
                        </div>
                        <div className={styles.given_key}>
                            <h3>kiss</h3>
                        </div>
                    </div>
                </div>

                <div className={styles.answer_card}>
                    <div className={styles.youranswer_box}>
                        <h2 className={styles.fb_title}>あなたの解答</h2>
                        <div className={styles.youranswer_content}>
                            <p>{orig}</p>
                        </div>
                        <div className={styles.gec_content}>
                            {showGECButton ? (
                                <div className={styles.gec_button_container}>
                                    <button
                                        className={styles.button}
                                        onClick={onGECHandler}
                                        >
                                            文法的な誤りを訂正する
                                    </button>
                                </div>
                            ):(
                                <p>{result}</p>
                            )}  
                        </div>
                    </div>

                    <div className={styles.scoring_box}>
                        <h2 className={styles.fb_title}>採点結果</h2>
                        <div className={styles.scoring_content}>
                            <table>
                                <tr>
                                    <th>語句の使用</th>
                                    <th>写真との関連度</th>
                                    <th>適切な文法</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>0</td>

                                </tr>
                            </table>
                        </div>
            
                    </div>

                    <div className={styles.answerex_box}>
                        <h2 className={styles.fb_title}>正答例</h2>
                        <div className={styles.answerex_content}>
                            <p>An elephant is kissing a man by his cheak.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.next_button}>
                    <Submit content="次に進む" onHandler={onHandler}/>
                </div>
                
                     
            </div>
        </div>
    )
}

export default Answer;
