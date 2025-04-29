
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Start from "../pages/start.jsx";
import Game from "../pages/game.jsx";
import Info from "../pages/info.jsx";
import App from "../App.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <p>Error occurred</p>,
        children: [
            {
                index: true,
                element: <Navigate to="/start" /> // <- path as "/" will always be redirected to "/start"
            },
            {
                path: "/start",
                element: <Start />
            },
            {
                path: "/game",
                element: <Game />
            },
            {
                path: "/info", // Legg til ruten for infosiden
                element: <Info />
            }
        ]
    },
    {
        path: "*",
        element: <p>Page not found</p>
    }
]);

const AppRouter = () => {
    return (
        <RouterProvider router={router}/>
    )
}
export default AppRouter;
