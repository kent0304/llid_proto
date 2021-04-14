import React, { useState } from 'react';
import Head from 'next/head';
import styles from "./question.module.scss";
import Image from "next/image";
import Submit from "../../components/Submit";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Answer from "../../components/Answer";
import axios from "axios";



const Question= () => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState("");
    const onShowAnswerHandler = () => {
        setShowAnswer(true);
    };
    const onHideAnswerHandler = () => {
        setShowAnswer(false);
    };
    const onSendHandler = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/judge",
                {answer: answer}
            );
            if (response.status === 200) {
                const resData = await response.data;
                console.log(resData);
                setResult(resData.result);

                console.log(result);
                console.log("ここまで");
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div>
            <Head>
                <title>Spidy</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            {showAnswer ? (
                <Answer 
                    orig={answer} 
                    result={result}
                    onHandler={onHideAnswerHandler}
                />
            ) : (
                <div>
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
                            <div className={styles.submit_button} onClick={onSendHandler}>
                                <Submit 
                                    content="解答する" 
                                    onHandler={onShowAnswerHandler}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <Footer />
        </div>
    )
}

export default Question;
