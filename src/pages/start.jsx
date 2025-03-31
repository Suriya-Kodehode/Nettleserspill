import styles from '../CSSModules/start.module.css'

import { Link } from 'react-router-dom';

function Start() {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.box}>
                    <h1>Tower Defense</h1>
                    <Link to="/game">
                        <button>START</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Start;