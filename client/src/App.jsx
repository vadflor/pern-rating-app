import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import { RestaurantsContextProvider } from './context/RestaurantsContext';


const App = () => {
    return <RestaurantsContextProvider>
    <div className='container'>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/restaurants/:id/update" element={<UpdatePage />}/>
                <Route path="/restaurants/:id" element={<RestaurantDetailPage />}/>
            </Routes>
        </BrowserRouter>
    </div>
    </RestaurantsContextProvider> 
}

export default App;