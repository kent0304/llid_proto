import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from "./question.module.scss";
import Image from "next/image";
import Submit from "../../components/Submit";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Answer from "../../components/Answer";
import Link from 'next/link';
import axios from "axios";
import { TailSpin } from 'react-loader-spinner'




const Question= () => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [answer, setAnswer] = useState(" ");
    const [ary, setAry] = useState(['']);
    const [result, setResult] = useState("");

    const [origHightlights, setOrigHightlights] = useState([-1]);
    const [corHightlights, setCorHightlights] = useState([-1]);
    // useEffect(() => {
    //     console.log("useEffect");
    // }, []);
    // interface ErrIdices {
    //     [name: string]: number;
    // }
    interface ErrTotal {
        [name: string]: any;
    }
    const [errTotal, setErrTotal] = useState<ErrTotal>({});

    const onShowAnswerHandler = () => {
        setShowAnswer(true);
    };
    const onHideAnswerHandler = () => {
        setShowAnswer(false);
        setResult("");
    };



    const onSendHandler = async () => {
        try {
            const splitAnswer = answer.split(" ");
            console.log("splitAnswer",splitAnswer);
            setAry(splitAnswer);
            console.log("ary",ary);
            
            const response = await axios.post(
                "http://localhost:5000/assess",
                {composition: answer, 
                id: "197"}
            );
            if (response.status === 200) {
                const resData = await response.data;
                console.log("取得データ",resData);
                setResult(resData.result);
                setErrTotal(resData.errant);
                const origTmp = errTotal["orig_highlights"]
                const corTmp = errTotal["cor_highlights"]
                setOrigHightlights(origTmp);
                setCorHightlights(corTmp);
                console.log("origHightlights",origHightlights);
                console.log("corHightlights",corHightlights);
                
                console.log("----")
                console.log("====")
                console.log("errTotal",errTotal)
                console.log("ここまで");
            }
        } catch (err) {
            console.log(err);
        }
    };




    return (
        <div>
            <Head>
                <title>画像描写自動評価システム</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <div>
                <div className={styles.question_container}>
                    <div className={styles.question_card}>
                        <div className={styles.question_title}>
                            <h2>問題 1</h2>
                            <div className={styles.direction}>
                                <p>画像の中の枠の部分（人や動物、食べ物、物体）について、それがどのような物でどういった状況で、どこにあるか、 何をしているか等、具体的に1文の英語で説明してください。</p>
                                <ul>
                                    <li>4単語以上の英単語で文を作ってください。</li>
                                    <li>写真から判断困難なもの（未来・過去の推測等）は含めないでください。</li>
                                    <li>枠の部分以外を描写しても構いませんが、必ず枠の部分の情報を含めてください。</li>
                                    <li>作文データ中に個人を特定できるような情報を含めないでください。</li>
                                </ul>
                                

                            </div>
                            <div className={styles.question_image}>
                                <Image 
                                    src={"/images/103966_48960.png"}
                                    alt={"question image"}
                                    width={180}
                                    height={220}
                                    
                                />
                            </div>
                        </div>  
                    </div>
                    {showAnswer ? (
                        <div className={styles.answer_card}>
                            <div className={styles.result_title}>
                                <h2>あなたの解答</h2>
                                    {answer === ""  ? (
                                        <>
                                            <p className={styles.result_detail}>　</p>
                                        </>
                                    ) : (
                                        <p className={styles.result_detail}>
                                            {answer}
                                            {/* {ary.map((w, idx) => {
                                                if (origHightlights.includes(idx)) {
                                                    return (
                                                            <p className={styles.result_detail_w_red}>{w}</p>
                                                    )
                                                } else {
                                                    return (
                                                        <p className={styles.result_detail_w}>{w}</p>
                                                    )
                                                }
                                                
                                            })}  */}
                                        </p>
                                    )}
                            </div>
                            <div className={styles.result_title}>
                                <h2>添削結果</h2>
                                
                                <div className={styles.loader}>
                                    {result === "" ? (
                                        <>
                                            <p className={styles.loader_msg}>添削中...　</p>
                                            <TailSpin color="grey" height={30} width={30} />
                                        </>
                                    ) : (
                                        <p className={styles.result_detail}>{result}</p>
                                    )}
                                </div>
                                
                            </div>
                            <div className={styles.back_button_box} >
                                <button
                                    className={styles.back_button} onClick={onHideAnswerHandler}
                                >
                                    BACK
                                </button>
                            </div>
                        </div>
                        
        
                    ) : (
                        <div className={styles.answer_card}>
                            <div className={styles.question_title}>
                                <h2>解答</h2>
                                <textarea
                                        spellCheck="false"
                                        value={answer}
                                        onChange={(input) => setAnswer(input.target.value)}
                                        className={styles.answer_box}
                                        placeholder="ここに文を入力してください"
                                ></textarea>
                            </div>
                            <div className={styles.submit_button} onClick={onSendHandler}>
                                <Submit 
                                    content="解答する" 
                                    onHandler={onShowAnswerHandler}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Question;
