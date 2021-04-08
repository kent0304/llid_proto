import React, { useState } from 'react';
import Head from 'next/head';
import styles from "./question.module.scss";
import Image from "next/image";
import Submit from "../../components/Submit";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Question = () => {
    const [answer, setAnswer] = useState("");
    return (
        <div>
            <Head>
                <title>Spidy</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
        
            <div className={styles.question_container}>
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
                    <div className={styles.question_title}>
                        <h2>Answer</h2>
                        <textarea
                                value={answer}
                                onChange={(input) => setAnswer(input.target.value)}
                                className={styles.answer_box}
                                placeholder="Enter your answer here."
                        ></textarea>
                    </div>
                    <div className={styles.submit_button}>
                    <Submit content="解答する"/>
                </div>
                </div>
                
            </div>
            <Footer />
        </div>
    )
}

export default Question;
