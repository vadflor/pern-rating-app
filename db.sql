-- for help \?

-- list database \l

-- Create database CREATE DATABASE database_name;

-- list all tables \d


CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >=1 and price_range<=5)
);

INSERT INTO restaurants (id, name, location, price_range) values (
    123, 'mcdonalds','new york', 3
);

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check (rating >=1 and rating <=5)
);