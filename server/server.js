require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
//midelwares
app.use(cors());
app.use(express.json());

//Get all restaurants
app.get("/api/v1/restaurants", async (req,res)=>{
    try {
        // const results = await db.query("select * from restaurants");
        const restaurantRatingData = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id");

        

        res.status(200).json({
        status: "success",
        results : restaurantRatingData.rows.length,
        data: {
            restaurants : restaurantRatingData.rows,
        },
    });    
    } catch (err) {
        console.log(err);
    }
    
});

// Get a restaurant 
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const restaurant = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1", [req.params.id]);

        const reviews = await db.query("select * from reviews where restaurant_id = $1", [req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                restaurants: restaurant.rows[0],
                reviews : reviews.rows
            }
        });
    } catch (err) {
        console.log(err)
    }
});

//Create a restaurant
app.post("/api/v1/restaurants", async (req,res)=>{
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
        res.status(201).json({
            status: "success",
            data: {
                restaurants: results.rows[0],
            }
        });
    } catch (err) {
        console.log(err)
    }
});

//Update restaurant
app.put("/api/v1/restaurants/:id", async (req,res)=>{
    try {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);

        res.status(200).json({
        status: "success",
        data: {
            restaurants: results.rows[0],
        }
    });
    } catch (err) {
        console.log(err)
    }
    
});

//Delete restaurant 
app.delete("/api/v1/restaurants/:id", async (req, res)=>{
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
        res.status(204).json({
            status: "success"
        });
    } catch (err) {
        console.log(err)
    }
    
})
// Add a review
app.post("/api/v1/restaurants/:id/addReview", async (req,res)=>{
    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *", 
        [req.params.id, req.body.name, req.body.review, req.body.rating]);
        res.status(201).json({
            status: "success",
            data : {
                review : newReview.rows[0],
            },
        });
    } catch (err) {
        console.log(err)
    }
});


const port = process.env.PORT || 3001;
app.listen(port, ()=>{
    console.log(`Server is up and listening on port ${port}`);
});