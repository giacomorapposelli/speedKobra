-- DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

-- CREATE TABLE users(
--   id SERIAL PRIMARY KEY,
--   first VARCHAR(255) NOT NULL CHECK (first != ''),
--   last VARCHAR(255) NOT NULL CHECK (last != ''),
--   email VARCHAR(255) NOT NULL UNIQUE CHECK (email != ''),
--   address VARCHAR(255) NOT NULL CHECK (address != ''),
--   zip VARCHAR(255) NOT NULL CHECK (zip != ''),
--   city VARCHAR(255) NOT NULL CHECK (city != ''),
--   country VARCHAR(255) NOT NULL,
--   password VARCHAR(255) NOT NULL CHECK (password != ''),
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  tshirt VARCHAR(255),
  size VARCHAR(255),
  vinyl VARCHAR(255),
  color VARCHAR(255),
  price INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);