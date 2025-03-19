import React from 'react'
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Details from "./pages/Details.jsx"
import Favourites from "./pages/Favourites.jsx"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"
                       element={<Home/>}/>
                <Route path="/details/:id"
                       element={<Details/>}/>
                <Route path="/favourites"
                       element={<Favourites/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;