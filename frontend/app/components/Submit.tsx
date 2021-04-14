import React from 'react';
import styles from "./Submit.module.scss";
import Link from 'next/link';


type Submit = {
    content: string
    // link: string
    onHandler: VoidFunction
}

const Submit = ( { content, onHandler }: Submit ) => {
    return (
        <div>
            <button
            className={styles.button}
            onClick={onHandler}
            >
                {content}

            </button>
        </div>
    )
}

export default Submit;
