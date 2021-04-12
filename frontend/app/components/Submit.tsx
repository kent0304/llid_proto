import React from 'react';
import styles from "./Submit.module.scss";
import Link from 'next/link';


type Submit = {
    content: string
    link: string
}

const Submit = ( { content, link }: Submit ) => {
    return (
        <div>
            <button
            className={styles.button}
            >
                <Link href={link}>
                        {content}
                </Link>
            </button>
        </div>
    )
}

export default Submit;
