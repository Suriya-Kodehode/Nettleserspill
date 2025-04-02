import { useRef, useEffect } from 'react';

import styles from '../../CSSModules/Renderer.module.css';

export const Renderer = ({ enemies, bullets, towers }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            towers.forEach((tower) => {
                tower.draw(ctx);
            })
            enemies.forEach((enemy) => {
                enemy.render(ctx);
            });
            bullets.forEach((bullet) => {
                bullet.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(render);
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [enemies, bullets, towers]);
    return <canvas ref={canvasRef} className={styles.canvas}/>;
}

export default Renderer;