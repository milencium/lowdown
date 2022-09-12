const Router = require('koa-router');
const router = new Router();

const {
    UserController,
    ProductController,
    ProductReviewController,
    ApplicationController,
} = require('../controllers')

const isAuthenticated = require('../polices/isAuthenticated');

//User routes
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);

//Product routes
router.post("/products", isAuthenticated, ProductController.create);
router.get("/products", isAuthenticated, ProductController.find);
router.get("/products/:id", isAuthenticated, ProductController.findOne);
router.delete("/products/:id", isAuthenticated, ProductController.destroy);
router.put("/products/:id", isAuthenticated, ProductController.update)

//Product review

router.post("/productReview", isAuthenticated, ProductReviewController.create);
router.get("/productReview", isAuthenticated, ProductReviewController.find);

//Application for anonymous comments

router.post("/anonymousComment", isAuthenticated, ApplicationController.create);

module.exports = router;