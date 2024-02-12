-- blinkit_assignment.sql

-- Create table for users
CREATE TABLE blinkit_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

-- Create table for images
CREATE TABLE blinkit_images (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES blinkit_users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  image_base64 TEXT NOT NULL
);

-- Create table for login sessions
CREATE TABLE login_sessions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES blinkit_users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL
);
