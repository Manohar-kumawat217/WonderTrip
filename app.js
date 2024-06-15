// ------------------------------------ Basic Code setup ---------------------------------------//

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../WonderTrip/models/listing.js")
const path = require("path");
const MONGO_URL = "mongodb://127.0.0.1:27017/wondertrip";

// MOngoDB Connection Code start

main().then( () => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

// MOngoDB Connection Code end

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({ extended:true }));

//----------------GET REAUESTS ------------

// INDEX ROUTE

app.get("/listings",async(req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings})
})

// NEW ROUTE

app.get("/listings/new",(req,res) => {
    res.render("listings/new.ejs");
})

// SHOW ROUTE 

app.get("/listings/:id",async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

app.get("/listings/:id/edit",async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})

// ---------------- POST REQUESTS   ----------------

// CREATE ROUTE

app.post("/listings",async(req,res) => {
    let listing = new Listing(req.body.listing);
    await listing.save();
    res.redirect("/listings");
})

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
})

