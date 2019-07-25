const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");

// Show gigs
router.get("/", (req, res) =>
  Gig.findAll()
    .then(gigs => {
      res.render("gigs", {
        gigs
      });
    })
    .catch(err => console.log(err))
);

// Display add gig form
router.get("/add", (req, res) => res.render("add"));

// Add a gig
router.post("/add", (req, res) => {
  const data = {
    title: "Worldpress",
    technologies: "Worldpress, javascript,html,css",
    budget: "$1000",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Aenean ut nisl sollicitudin, vestibulum orci nec, malesuada mauris. 
        Nulla facilisi. Aliquam erat volutpat. ultricies vitae metus. 
        Proin in augue sit amet justo varius pharetra. Aliquam hendrerit at est sit amet laoreet.`,
    contact_email: "user2@gmail.com"
  };

  let { title, technologies, budget, description, contact_email } = data;
  // Insert into table
  Gig.create({
    title,
    technologies,
    description,
    budget,
    contact_email
  })
    .then(gig => res.redirect("/gigs"))
    .catch(err => console.log(err));
});

module.exports = router;
