import React from 'react';
import styles from "./Submit.module.scss";

type Submit = {
    content: string
}

const Submit = ( { content }: Submit ) => {
    return (
        <div>
            <button
            className={styles.button}
            >
                {content}
            </button>
        </div>
    )
}

export default Submit;
