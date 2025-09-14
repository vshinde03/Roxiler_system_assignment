Backend Setup

Install dependencies:

cd backend
npm install


Create a PostgreSQL database:

CREATE DATABASE store_rating_db;


Configure .env in backend/:

PORT=4000
DATABASE_URL=postgres://dbuser:dbpass@localhost:5432/store_rating_db
JWT_SECRET=your_secret_key


Run the server:

npm run dev


Server starts at: http://localhost:4000

Frontend Setup

Install dependencies:

cd frontend
npm install


Create .env in frontend/:

REACT_APP_API_URL=http://localhost:4000/api


Start React dev server:

npm start