
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const { validateListing, isLoggedIn, isOwner } = require("../middlewear");
const controllerListing = require("../controllers/listing.js");
const { get } = require("mongoose");
const multer = require('multer')

const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// Index Route
router.route("/")
.get( wrapAsync(controllerListing.index))
.post(isLoggedIn,  upload.single("listing[image]"), validateListing , wrapAsync(controllerListing.createListing ));

// New Route
router.get("/new",isLoggedIn, wrapAsync(controllerListing.renderNewForm) );

// Show Route
router.route("/:id")
.get( wrapAsync(controllerListing.showListing ))
.put( isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(controllerListing.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(controllerListing.destroyListing ));



// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(controllerListing.editListing ));



module.exports = router;
