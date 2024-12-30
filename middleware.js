const Listing=require("./models/listing");
const Review=require("./models/review");
const ExpressError= require("./utils/ExpressError.js");
const { listingSchema , reviewSchema}=require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be loggen in to create listing!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner= async(req,res,next) =>{
    let { id }= req.params;
    let listing= await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you aren't the owner of this listing");
        return res.redirect(`/listing/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateReview=(req,res,next)=>{
    let { error } = reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

module.exports.isReviewAuthor= async(req,res,next) =>{
    let { id, reviewId }= req.params;
    let review= await Review.findById(reviewId);
    if(!review.owner.equals(res.locals.currUser._id)){
        req.flash("error","you aren't the author of this review");
        return res.redirect(`/listing/${id}`);
    }
    next();
};

/*module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;

    try {
        // Find the review and populate the owner field
        const review = await Review.findById(reviewId).populate("owner");

        if (!review) {
            req.flash("error", "Review not found");
            return res.redirect(`/listings/${id}`);
        }

        if (!res.locals.currUser) {
            req.flash("error", "You must be logged in to perform this action");
            return res.redirect("/login");
        }

        if (!review.owner.equals(res.locals.currUser._id)) {
            req.flash("error", "You aren't the author of this review");
            return res.redirect(`/listings/${id}`);
        }

        next();
    } catch (err) {
        console.error("Error in isReviewAuthor middleware:", err);
        req.flash("error", "Something went wrong");
        return res.redirect(`/listings/${id}`);
    }
};*/
