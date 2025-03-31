import styles from '../CSSModules/start.module.css'

import { Link } from 'react-router-dom';

function Start() {

    return (
        <>
            <div>
                <h1>Tower Defense</h1>

                <Link to="/game">
                    <button>Example link to game page</button>
                </Link>
            </div>
        </>
    )
}

export default Start;