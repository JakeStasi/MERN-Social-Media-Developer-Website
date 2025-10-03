// React frontend → "Hey backend, I need Jake’s profile" (GET /api/profile/123).
// React  makes the request to the express backend

// Express backend → "Got it, I’ll grab it from MongoDB" (Mongoose query).
// Express receives the request the gets the data from MongoDb using mongoose


// MongoDB → returns the profile data.
// Gives the data back to express

// Express → formats it as JSON and sends it back.
// Then express sends it back to the front end so it can be used

// React → shows it in the UI.

// Postman = testing tool to make sure your API actually works before hooking it up to React.
// Instead of writing React code to send a signup request, you can send the same request directly in Postman.


// express is the backend to build our API (application programmng interface)
const express = require("express");

// connects to mongodb using mongoose
const connectDB = require("./config/db");



// Connect the database
connectDB();

// creates the express app
const app = express();

// Initialize middleware
// Middleware sits after the request in express but before the route  
// Since express doesn't know how to read json data we use middleware which parses the json into a javascript object which is then usable

app.use(express.json({ extended: false}));



app.get("/", (req, res) => res.send("API Running WOOO"));

// Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port 5000'));