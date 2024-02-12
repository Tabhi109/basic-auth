### Abhinav Tripathi
Hello! 👋 I'm Abhinav Tripathi, a final-year student in Computer Science and Engineering. I am passionate about software development and enjoy working on a variety of projects.

- 🌐 [GitHub](https://github.com/Tabhi109)
- 💼 [LinkedIn](https://www.linkedin.com/in/abhinav-tripathi-46872b201/)
# Blinkit Authentication System

## Overview
The Blinkit Authentication System is a secure web application built using Next.js, TypeScript, and PostgreSQL. This project implements fundamental authentication features, including user registration, login, logout, and image upload functionalities.

### Features Implemented
  - Uses the `@vercel/postgres` library for database interactions.
1. **User Registration (`signUp.ts`):**
   - The `signUp` API allows users to register by providing their first name, last name, username, email, and password.
   - Passwords are securely hashed using a hashing algorithm before being stored in the PostgreSQL database.

2. **User Login (`login.ts`):**
   - The `login` API validates user credentials (username and password) against the stored hashed passwords in the database.
   - Upon successful login, a session token is generated and stored in the `login_sessions` table associated with the user.

3. **User Logout (`logout.ts`):**
   - The `logout` API allows users to invalidate their session token, effectively logging them out.
   - Session tokens are stored securely in the `login_sessions` table.

4. **Image Upload (`upload.ts`):**
   - Authenticated users can upload images using the `upload` API.
   - Uploaded images are stored in the `blinkit_images` table, associated with the user who uploaded them.

### Frontend Components

1. **Login Form (`LoginForm.tsx`):**
   - A reusable React component for user login.
   - Passwords are converted to base64 before sending to the API for added security.

2. **Signup Form (`SignupForm.tsx`):**
   - A React component for user registration.
   - Utilizes the same base64 password conversion for enhanced security.

3. **Logout Button (`LogoutButton.tsx`):**
   - A reusable React component for logging out.
   - Allows users to terminate their session and securely log out.

4. **Image Upload Form (`ImageUploadForm.tsx`):**
   - A React component for authenticated users to upload images.
   - Utilizes the `fetch` API to send image data securely to the server.

### Database: PostgreSQL

The project uses a PostgreSQL database to store user information, session data, and uploaded images. Tables include:

1. **blinkit_users:**
   - Stores user details (id, username, first name, last name, password, email).

2. **blinkit_images:**
   - Stores uploaded image data (id, user_id, image_base64).

3. **login_sessions:**
   - Manages user sessions (id, user_id, session_token).

### Authentication Logic

The authentication system employs a secure logic flow:
   - During registration, passwords are hashed before storage.
   - For login, the hashed password in the database is compared with the entered password.
   - Session tokens are generated upon successful login and stored securely in the database.
   - Logout invalidates the session token, enhancing security.

## How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/Tabhi109/blinkit-authentication.git
   ```

2. Install dependencies:

   ```bash
   cd blinkit-authentication
   npm install
   ```

3. Set up your PostgreSQL database and configure the connection in the `.env.local` file.

4. Run the development server:

   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to experience the Blinkit Authentication System!

Feel free to explore the code, make improvements, and customize it based on your needs.

Happy coding! 🚀