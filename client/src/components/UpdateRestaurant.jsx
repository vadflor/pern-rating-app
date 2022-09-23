import React, { useState, useContext } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate } from "react-router-dom";

const UpdateRestaurant = (props) => {
    let navigate = useNavigate();
    const {id} = useParams();
    const {restaurants} = useContext(RestaurantsContext);
    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [priceRange, setPriceRange] = useState();

    useEffect(()=>{
        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`);
            
            setName(response.data.data.restaurants.name);
            setLocation(response.data.data.restaurants.location);
            setPriceRange(response.data.data.restaurants.price_range);
        }
        fetchData();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`,{
            name,
            location,
            price_range: priceRange,
        });
        navigate("/");
        
    };

  return (
    <div>
    {/* <h1>{restaurants[0].name}</h1> */}
        <form action="">
            <div className="form-group">
                <label htmlFor="nama">Name</label>
                <input value={name} onChange={e => setName(e.target.value)} type="text" id='name' className='form-control' />
            </div>
            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input value={location} onChange={e => setLocation(e.target.value)} type="text" id='location' className='form-control' />
            </div>
            <div className="form-group">
                <label htmlFor="price_range">Price Range</label>
                <input value={priceRange} onChange={e => setPriceRange(e.target.value)} type="number" id='price_range' className='form-control' />
            </div>
            <button onClick={handleSubmit} className='btn btn-primary'>Submit</button>
        </form>
    </div>
  )
}

export default UpdateRestaurant