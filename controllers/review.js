const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        const newReview = new Review(req.body.review);
        newReview.author = req.user._id;

        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        req.flash("success", "New review created");
        res.redirect(`/listings/${listing._id}`);
    } catch (err) {
        req.flash("error", "Unable to create review");
        res.redirect(`/listings/${req.params.id}`);
    }
};

module.exports.destroyReview = async (req, res) => {
    try {
        const { id, reviewId } = req.params;

        // Remove review reference from the Listing document
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

        // Delete the review from the Review collection
        await Review.findByIdAndDelete(reviewId);

        req.flash("success", "Review deleted");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        req.flash("error", "Unable to delete review");
        res.redirect(`/listings/${id}`);
    }
};
