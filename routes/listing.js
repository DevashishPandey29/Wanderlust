const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
/*const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");*/
const Listing = require("../models/listing");
const {isLoggedIn, isOwner, validateListing} = require("../middleware");
const listingController=require("../controllers/listing");
const multer  = require("multer");
const { storage }=require("../cloudConfig");
const upload = multer({ storage });

/*console.log("isLoggedIn:", isLoggedIn); // Should be a function
console.log("validateListing:", validateListing); // Should be a function
console.log("listingController:", listingController); // Should be an object
console.log("listingController.createListing:", listingController.createListing); // Should be a function
console.log("upload:", upload); // Should be an object*/


router
.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
);

// New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get( wrapAsync(listingController.showListing))

.put(isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
     validateListing, 
      wrapAsync(listingController.updateListing)
)
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing)
);

// Edit route
router.get("/:id/edit",  isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm)
)

module.exports = router;