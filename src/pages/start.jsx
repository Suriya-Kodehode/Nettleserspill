import styles from '../CSSModules/start.module.css';
import { Link } from 'react-router-dom';

function Start() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.box}>
                    <h1 className={styles.title}>Tower Defense</h1>
                    <Link to="/game" className={styles.startButton}>
                        <p>START</p>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Start;
