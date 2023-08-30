import slugify from 'slugify';
import productModel from '../models/productModel.js';
import fs from 'fs';
import router from '../routes/productRoutes.js';

 export const createProductController = async (req, res) => {
try {
         const { name, slug, description, price, category, quantity, shipping} = 
         req.fields;
         const {photo} = req.files;
         //Validation
         switch(true){
             case !name: 
            return res.status(500).send({error:'Name is require'})

            case !description: 
            return res.status(500).send({error:'description is require'})

            case !price: 
            return res.status(500).send({error:'price is require'})

            case !category: 
            return res.status(500).send({error:'category is require'})


            case !quantity: 
            return res.status(500).send({error:'quantity is require'})


            case !photo && photo.size> 1000000:
            return res.status(500).send({error:'photo is require and should be less than 1 mb'})

      }


        const products = new productModel({...req.fields, slug:slugify(name)})
        if (photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type;
        }
        await products.save()
        res.status(201).send({
            success:true,
            message: 'product Created Successfully',
            products, 

        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in Creating Product"
        })
        
    }

};

//get all products
export const getProductController = async(req, res) => {
    try {
        const products = await productModel
        .find()
        .populate('category')
        .select("-photo")
        .limit(12)
        .sort({createdAt:-1})
        res.status(200).send({
            success:true,
            counttotal: products.length,
            message: "All products",
            products,
        });
        
    } catch (error) {
        console.log(error)
        req.status(500).send({
            success:false,
            message: 'Error in gatting product',
            error: error.message
        });
    }

};

//get single product
export const getSingleProductController = async(req, res) => {
    try {
        const product = await productModel.findOne({slug:req.params.slug})
        .select("-photo")
        .populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
      product,
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error while getting single products',
            error
        })
        
    }

};

//get photo

export const  productPhotoController = async(req, res) => {
    try {
        const product = await productModel.findOne({_id: req.params.pid}).select("photo")
        if(product.photo.data){
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
    }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: "Error while getting photo",
            error
        })
        
    }

};

//Delete product
 export const deleteProductController = async(req, res) => {
    try {
        await productModel.findByIdAndDelete({_id: req.params.pid}).select("-photo")
        res.status(200).send({
            success: true,
            message: "Product delete succcessfully"
        })
        
    } catch (error) {
        consol.log(error)
        res.status(500).send({
            success: false,
            message: "Error while deleting products",
            error
        })
    }
};

//update product

export const updateProductController = async(req, res) => {
    try {
    const { name, description, price, category, quantity, shipping} = 
    req.fields;
    const {photo} = req.files;
    //Validation

    switch(true){
        case !name: 
        return res.status(500).send({error:'Name is require'})

        case !description: 
        return res.status(500).send({error:'description is require'})

        case !price: 
        return res.status(500).send({error:'price is require'})

        case !category: 
        return res.status(500).send({error:'category is require'})


        case !quantity: 
        return res.status(500).send({error:'quantity is require'})


        case !photo && photo.size> 1000000:
        return res.status(500)
        .send({error:'photo is require and should be less than 1 mb'})

  }
    const products = await productModel.findByIdAndUpdate({_id: req.params.pid},
        {...req.files, slug:slugify(name)}, {new:true}
        )
    if (photo){
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
    }
    await products.save()
    res.status(201).send({
        success:true,
        message: 'product Updated Successfully',
        products, 

    });

} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:"Error in updating Product"
    });
}
};

//filter

export const productFiltersController = async (req, res) => {
    try {
      const { checked, radio } = req.body;
      let args = {};
      if (checked.length > 0) args.category = checked;
      if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
      const products = await productModel.find(args);
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error While Filtering Products",
        error,
      });
    }
  };

  //product count
  export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount(
            res.status(200).send({
                success:true,
                total,
            })
        )
        
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message: 'Error in product count',
            error,
        })
        
    }
  }

//product list based on list
export const productListController = async(req, res) => {
    try {
        const perPage = 2
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
        .find({})
        .select("-photo")
        .skip((page -1) * perPage).limit(perPage)
        .sort({createdAt: -1});
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'error in per page ctrl',
            error,
        })
     }
 }


