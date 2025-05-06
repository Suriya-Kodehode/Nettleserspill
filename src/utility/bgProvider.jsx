import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const BackgroundContext = createContext();
export const useBackground = () => useContext(BackgroundContext);

const BackgroundProvider = ({ children }) => {
    const location = useLocation();
    const [backgroundClass, setBackgroundClass] = useState("startBG");

    useEffect(() => {
        const newBackground = location.pathname === "/start"
            ? "startBG"
            : location.pathname === "/game"
            ? "gameBG"
            : "";

        setBackgroundClass(newBackground);

        document.documentElement.style.backgroundColor =
            newBackground === "gameBG" ? "#242424" : "#ffffff";
    }, [location.pathname]);

    return (
        <BackgroundContext.Provider value={{ backgroundClass }}>
            <div className={backgroundClass}>{children}</div>
        </BackgroundContext.Provider>
    );
};

export default BackgroundProvider;
