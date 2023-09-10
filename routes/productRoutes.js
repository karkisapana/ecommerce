import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { 
    brainTreePaymentController,
    braintreeTokenController,
    createProductController, 
    deleteProductController, 
    getProductController, 
    getSingleProductController, 
    productCategoryController, 
    productCountController, 
    productFiltersController, 
    productListController, 
    productPhotoController, 
    relatedProductController, 
    searchProductController, 
    updateProductController 
} from '../controller/productController.js';
import formidable from 'express-formidable';

const router = express.Router()

//routes
router.post('/create-product', 
requireSignIn, 
isAdmin,formidable(),
createProductController 
);

//update Product

router.patch('/update-product/:pid', 
requireSignIn, 
isAdmin,formidable(),
// updateProductController 
updateProductController 
);


//get product
router.get('/get-product', getProductController);

//single product
router.get('/get-product/:slug', getSingleProductController);

//get photo
router.get('/product-photo/:pid', productPhotoController);

//delete product
router.delete('/delete-product/:pid', deleteProductController);

// Filter Routes
router.post('/product-filters', productFiltersController);

// Product Count
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController);

//search product
router.get('/search/:keyword', searchProductController);

//Similer Products
router.get('/related-product/:pid/:cid', relatedProductController);

//category wise product
router.get('/product-category/:slug', productCategoryController);

//payment routes
//token
router.get('/braintree/token', braintreeTokenController);

//payments
router.post('/braintree/payment', requireSignIn, brainTreePaymentController);


export default router;