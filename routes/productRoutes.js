import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { 
    createProductController, 
    deleteProductController, 
    getProductController, 
    getSingleProductController, 
    productPhotoController, 
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

router.post('/update-product/:pid', 
requireSignIn, 
isAdmin,formidable(),
updateProductController 
);


//get product
router.get('/get-product', getProductController);

//single product
router.get('/get-product/:slug', getSingleProductController);

//get photo
router.get('/product-photo/:pid', productPhotoController)

//delete product
router.delete('/delete-product/:pid', deleteProductController)



export default router;