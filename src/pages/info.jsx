import styles from '../CSSModules/info.module.css';

import { Link } from 'react-router-dom';

function Info() {
    const gameElements = [
        {
            name: 'Gunner',
            image: '/images/BalloonGunnerAnim.gif', // Legg til riktig bildebane
            description: 'Et standard tårn som skyter fiender med middels skade.',
            damage: 'Skade: 50',
            range: 'Rekkevidde: 100'
        },
        {
            name: 'Cannon',
            image: '/images/Cannon.gif', // Legg til riktig bildebane
            description: 'En kraftig kanon som skyter ett flammende inferno, men med høy skade.',
            damage: 'Skade: 120',
            range: 'Rekkevidde: 80'
        },
        {
            name: 'Fiende 1',
            image: '/images/enemy1.png', // Legg til riktig bildebane
            description: 'En rask fiende med lav helse.',
            health: 'Helse: 30',
            speed: 'Hastighet: Høy'
        },
        {
            name: 'Fiende 2',
            image: '/images/Boss.png', // Legg til riktig bildebane
            description: 'En treg fiende med høy helse.',
            health: 'Helse: 100',
            speed: 'Hastighet: Lav'
        }
    ];

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.yabangusText}>Om Tower Defense</h1> {/* Bruker Yabangus-fonten */}
                <div className={styles.elements}>
                    {gameElements.map((element, index) => (
                        <div key={index} className={styles.element}>
                            <img src={element.image} alt={element.name} className={styles.image} />
                            <div className={styles.info}>
                                <h2 className={styles.yabangusText}>{element.name}</h2> {/* Bruker Yabangus-fonten */}
                                <p>{element.description}</p>
                                {element.damage && <p>{element.damage}</p>}
                                {element.range && <p>{element.range}</p>}
                                {element.health && <p>{element.health}</p>}
                                {element.speed && <p>{element.speed}</p>}
                            </div>
                        </div>
                    ))}
                </div>
                <Link to="/" className={styles.backLink}>
                    Tilbake til start
                </Link>
            </div>
        </>
    );
}

export default Info;