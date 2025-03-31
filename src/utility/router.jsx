import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Start from "../pages/start.jsx";
import Game from "../pages/game.jsx";
import App from "../App.jsx";

const router = createBrowserRouter ([
    {
        path:"/",
        element: <App/>,
        errorElement: <p>Error occurred</p>,
        children: [
            {
                index: true,
                element: <Start/>
            },
            {
                path: "/game",
                element: <Game/>
            }
        ]
    },
    {
        path:"*",
        element: <p>Page not found</p>
    }
])

const AppRouter = () => {
    return (
        <RouterProvider router={router}/>
    )
}
export default AppRouter;
