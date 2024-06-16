// ------------------------------------ Basic Code setup ---------------------------------------//

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../WonderTrip/models/listing.js")
const path = require("path");
const methodOverride = require("method-override")

// MongoDB Connection Code start ----------------------------------------------

const MONGO_URL = "mongodb://127.0.0.1:27017/wondertrip";

main().then( () => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

// MOngoDB Connection Code end ------------------------------------------------



app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({ extended:true }));
app.use(methodOverride('_method'));

// INDEX ROUTE

app.get("/listings",async(req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings})
})

//  -------------------------------  CREATE ------------------------------

// NEW ROUTE

app.get("/listings/new",(req,res) => {
    res.render("listings/new.ejs");
})

// CREATE ROUTE

app.post("/listings",async(req,res) => {
    let listing = new Listing(req.body.listing);
    await listing.save();
    res.redirect("/listings");
})

//  -------------------------------  CREATE ------------------------------

//  -------------------------------  READ  -------------------------------
// SHOW ROUTE 

app.get("/listings/:id",async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

//  -------------------------------  READ  -------------------------------

//  -------------------------------  UPDATE  -------------------------------

//  EDIT ROUTE

app.get("/listings/:id/edit",async(req,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})

// UPDATE ROUTE

app.put("/listings/:id",async(req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
})

// DELETE ROUTE

app.delete("/listings/:id",async(req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
})

