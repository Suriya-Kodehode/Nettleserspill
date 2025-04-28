
import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

const BackgroundContext = createContext();
export const useBackground = () => useContext(BackgroundContext);

const BackgroundProvider = ({ children }) => {
    const [backgroundClass, setBackgroundClass] = useState("startBG");
    const location = useLocation();

    useEffect(() => {
        const newBackground =
            location.pathname === "/start"
            ? "startBG"
            : location.pathname === "/game"
            ? "gameBG"
            : "";
        if (backgroundClass !== newBackground) {
            setBackgroundClass(newBackground);
        }
    }, [location.pathname]);

    return (
        <BackgroundContext.Provider value={{ backgroundClass, setBackgroundClass }}>
            <Wrapper>
                <div className={backgroundClass}>{children}</div>
            </Wrapper>
        </BackgroundContext.Provider>
    )
}

const Wrapper = ({ children }) => {
    const { backgroundClass } = useBackground();
    return (
        <div className={backgroundClass}>
            {children}
        </div>
    )
}

export default BackgroundProvider;
