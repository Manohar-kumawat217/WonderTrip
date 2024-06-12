const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
            type : String,
            required : true,
    },
    description : String,
    image : {
        type : String,
        default:"https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",
        set : (v) => v === "" ? "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png":v , 
    },
    price : Number,
    location : String,
    country : String
})

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;