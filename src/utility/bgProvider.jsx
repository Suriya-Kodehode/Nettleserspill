// Dynamic background provider

import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

const BackgroundContext = createContext();

export const BackgroundProvider = ({ children }) => {
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
    }, [location.pathname, backgroundClass]);

    return (
        <BackgroundContext.Provider value={{ backgroundClass, setBackgroundClass }}>
            <div className={backgroundClass}>{children}</div>
        </BackgroundContext.Provider>
    )
}

export const useBackground = () => useContext(BackgroundContext);