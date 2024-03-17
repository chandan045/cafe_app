const express=require("express");
const object=require("../models/model")

const router=express.Router();
router.get("/", async (req,res)=>{
    try{
        const cafes = await object.find();
        res.render("home",{
            title : "Home Page",
            data : cafes
        });
    }
    catch(error){
        console.log("Error while getting values from DataBase");
    }
});


router.post("/add", async (req,res)=>{
    console.log(req.body);
    try{
        const cafe = new object({
            name : req.body.name,
            phone : req.body.phone,
            reviewSum : 0,
            reviewCount : 0
        });
        await cafe.save();
        res.redirect('/');
        req.session.message = {
            type : "success",
            info : "You have added a new cafe successfully"
        }
        
    }
    catch{
        console.log("Error while adding a new cafe");
    }
});





router.get('/add',(req,res)=>{
    res.render('add_cafe',{
        title:"Add new Cafe"
    })
})

// router.post('/add',async (req,res)=>{
     
//     try{
//         const user=new object({
//             name:req.body.name,
//             phone:req.body.phone,
//             reviewSum:0,
//             reviewCount:0
//         });
//         await user.save();
//         console.log("Saved a new cafe : " + user);
    
//     }
//     catch{
//         console.log("Error while adding new cafe");
//     }
    
// })



router.get("/rate/:id", async (req,res)=>{
    const id = req.params.id;
    try{
        const cafe = await object.findById(id);
        res.render("rate_cafe",{
            title : "Rate Cafe",
            cafe : cafe
        });
    }
    catch(err){
        console.log("Some error occured while getting the data of cafe");
    }
});

router.post("/rate/:id", async (req,res)=>{
    const id = req.params.id;
    const rating = parseInt(req.body.rating);
    try{
        const cafe = await object.findById(id);
        const newSum = parseInt(cafe.reviewSum) + rating;
        const newCount = parseInt(cafe.reviewCount) + 1;
        await object.findByIdAndUpdate(id,{
            reviewSum : newSum,
            reviewCount : newCount
        });
        res.redirect("/");

        req.session.message = {
            type : "success",
            info : "You have rated successfully"
        }

        
    }
    catch(err){
        console.log("Some error occured while getting the data of cafe");
    }
});


module.exports=router;