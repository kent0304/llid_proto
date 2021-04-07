import React from 'react';
import Link from 'next/link';

const Top = () => {
    return (
        <div>
            top画面やで
            <br></br>
            <Link href="question">
                <a>問題はこちら</a>
            </Link>
        
        </div>
    )
}

export default Top
