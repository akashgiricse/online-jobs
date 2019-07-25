const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
// DATABASE
const db = require("./config/database");
// Test DB
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("Error: " + err));
const app = express();

const PORT = process.env.PORT || 5000;

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Index route
app.get("/", (req, res) => res.render("index", { layout: "landing" }));

// Gig routes
app.use("/gigs", require("./routes/gigs"));

app.listen(PORT, console.log(`Server started at port ${PORT}`));
