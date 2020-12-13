const product = require('../model/ProductModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError')

 // creating product function 



 exports.createProduct = catchAsync(async ( req, res)=>{
     
    try{
        const newProduct = await product.create(req.body);
        console.log(newProduct)
        if (newProduct != null){
          res.status(200).json({
               status:'Product has added succesfully ',
               data:{
                   product:newProduct
               }
           })
        }

    }catch(Erro){
        res.status(400).json({
            status:'Failed',
            ErrorMessage:"Something went wrong ",
            Reason:Erro
        })
    }
        
       
         
     
 })
 // get users (Admin Function) 
exports.deleteProduct = catchAsync (async (req, res, next)=>{
    // get the id from the user firdt 
    console.log("Hi before ")
    const productId = await product.findById(req.params.id);
    console.log("Hi before deleting product", productId)
    try{
        const productId = await product.findByIdAndDelete(req.params.id);
        if (!productId){
            res.status(404).json({
                message:"No product found with the given id ",
                body:"There is no such a product or prooduct already delete it"

            })
        //    return next(new AppError('No product found with that ID', 404));
        }else {
            res.json({
                status: 'success',
                message: "Product has delected Successfully"
            })
        }

    }catch(error){
    console.log(error)
    }
   
})
// Update Products 
exports.updateProduct = catchAsync (async (req, res, next)=>{
    // get the id from the user firdt 
    console.log("Hi before ")
    
    try{
        const productId = await product.findByIdAndUpdate(req.params.id);
        if (!productId){
            res.status(404).json({
                message:"No product found with the given id ",
                body:"There is no such a product or prooduct already delete it"

            })
        //    return next(new AppError('No product found with that ID', 404));
        }else {
            res.json({
                status: 'success',
                message: "Product has update Successfully",
                result:productId
            })
        }

    }catch(error){
    console.log(error)
    }
   
})
    
    

 // get all the products , make it public 
 exports.getProduct = catchAsync(async (req, res, next)=> {

     // get all the products 
    try {

        console.log("hi before sending", req.requestTime )
     const mAllProduct = await product.find(req.body);
     res.status(200).json({
         status:'success',
         ProductList:mAllProduct.length,
         products:{
           
            mAllProduct
         }
     })
    }catch(error){
        res.json({
            Error:res.json({
                error:error
            })
        })

    }
     
     // update products 


    
     
    


    
 })
 

     // get email Address and password 
     
 


