import express, { Router } from "express"
import {
    registerController, 
    loginController, 
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController, 
    
} from '../controller/authController.js';

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router()

//routing
//Registor(method post)

router.post('/register',registerController);

//LOGIN || post request
router.post('/login', loginController);

//forget password
router.post('/forgot-password', forgotPasswordController)


//Test routes
router.get('/test', requireSignIn, isAdmin, testController);

router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });


//protected admin-route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send ({ ok: true});
});


// update profile
router.put('/profile', requireSignIn, updateProfileController);
export default router;

//order
router.get('/orders',requireSignIn, getOrdersController);


//All-order
router.get('/all-orders',requireSignIn,isAdmin, getAllOrdersController);

//order status update
router.get('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController);