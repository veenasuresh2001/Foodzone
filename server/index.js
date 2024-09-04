/*const express=require('express');
const cors=require('cors');
const {userModel,productModel}=require('./dataconfig')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app=express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//register
app.post('/register',async(req,res)=>{
    const {fullname,email,crs,password}=req.body;
    const result=await userModel.find({"email":email})
    if(result.length>0){
        res.json({"status":0,'msg':"email already exiting"})
    }
    else{
        bcrypt.hash(password, saltRounds, function(err, password) {
            // Store hash in your password DB.
            userModel.create({
                fullname,email,crs,password
            })
        });
        res.json({"status":1,'msg':"Thank you for register here!!!"})
}
});
app.listen(9000,()=>console.log("server running at http://localhost:9000/"))
//login
app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const result=await userModel.find({"email":email})
    if(result.length>0){
        const pwd=result[0].password;
        bcrypt.compare(password, pwd, function(err, result) {
            // result == true
            if(result==true){
                res.json({"status":0,'msg':"Successful"})
            }
            else{
                res.json({"status":1,'msg':"Wrong password!!!"})
            }
        });

    }
    else{
        res.json({"status":0,'msg':"email not correct"})
    }
    })*/

const express=require('express');

    
const cors=require('cors');
const app=express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {upload}=require('./multerfiles/uploadcode.js')
app.use(express.static('./uploads'));
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
const {custregModel,hotelregModel,foodModel,planModel,orderModel,paymentModel,buyModel,feedModel,customiseModel}=require('./dataconfig')
app.listen(9000,()=>console.log("server running at http://localhost:9000/"))
app.post('/register',async(req,res)=>{
    const {cname,address,contact,email,password}=req.body;
    const result=await custregModel.find({"email":email})
    if(result.length>0){
            res.json({"status":0,'msg':"Email already exist"})
        }
        else{
            bcrypt.hash(password, saltRounds, function(err, password) {
                // Store hash in your password DB.
                custregModel.create({
                    cname,address,contact,email,password
                })
            });
            res.json({"status":1,'msg':"Thank you for register here!!!"})
    }
    });
    //login
    app.post('/custlogin', async (req, res) => {
        const { email, password } = req.body;
      
          const result = await custregModel.find({ 'email': email });
      
          if (result.length > 0) {
            const pwd = result[0].password;
            const uid=result[0]._id
            const cname=result[0].cname
            bcrypt.compare(password, pwd, function (err, result1) {
              if (err) {
                // Handle bcrypt error
                console.error(err);
                res.json({ "status": 1, 'msg': "Error during password comparison" });
              } else {
                if (result1) {
                  res.json({ "status": 0, 'msg': "Successful","userId":uid,'cName':cname});
                } else {
                  res.json({ "status": 1, 'msg': "Wrong password!!!" });
                }
              }
            });
          } else {
            res.json({ "status": 1, 'msg': "Email not correct" });
          }
      });
      app.get("/fetchAllcust",async (req,res)=>{
        const result=await custregModel.find();
        if(result.length>0){
          res.json(result)
        }
        else{
          res.json([])
        }
      })

   //addfood
   

   app.post("/addfood/:hName", upload.single('image'), async (req, res) => {
     const { foodname, rate, description } = req.body;
     const image = req.file ? req.file.filename : null;
     const Name=req.params.hName;
     console.log(Name)
     try {
       await foodModel.create({
         foodname,
         rate,
        Name,
         description,
         image: image
       });
       res.json({ status: 1, msg: "Added to Menu" });
     } catch (error) {
       console.error("Error adding food:", error);
       res.status(500).json({ status: 0, msg: "Failed to add food" });
     }
   });
   
      //fetchByid
app.get("/fetchByid/:idn",async (req,res)=>{
    const idno=req.params.idn;
    const result=await custregModel.find({'_id':idno});
    if(result.length>0){
      res.json(result)
    }
    else{
      res.json([])
    }
  })
  app.delete('/deleteuser/:userId', async (req, res) => {
        await custregModel.deleteOne({ '_id': req.params.userId });
        res.json("data deleted successfully");
});
//edit

app.get("/getuser/:idn",async(req,res)=>{
  const id=req.params.idn;
   const result=await custregModel.find({'_id':id})
  //  (result.length>0)? res.json(result):res.json([])
  res.json(result)
})

app.post("/updateData",async(req,res)=>{
  const {fname,email,userid}=req.body;
  console.log(userid)

  await custregModel.updateOne({'_id':userid},
  {
    cname:fname,
    email:email
  })
  res.json("update successfully")
})
//adminlogin
app.post('/adminlogin', async (req, res) => {
  const { adminname, password } = req.body;
  if(adminname==="veena@gmail.com" && password==='veena123')
  {
    res.json({"status":0,'msg':'successful'})
  }
  else {
    res.json({ "status": 1, 'msg': "Wrong password!!!" });
  }
})
//hotelreg
app.post('/hotelregister', async (req, res) => {
  const { hname, address, contact, email, password, status } = req.body;

  try {
      // Check if email already exists
      const existingHotel = await hotelregModel.findOne({ email: email });

      if (existingHotel) {
          res.status(400).json({ status: 0, msg: "Email already exists" });
      } else {
          // Hash the password
          bcrypt.hash(password, saltRounds, async function (err, hashedPassword) {
              if (err) {
                  // Handle error
                  res.status(500).json({ status: 0, msg: "Error hashing password" });
              } else {
                  // Create new hotel registration
                  await hotelregModel.create({
                      hname,
                      address,
                      contact,
                      email,
                      password: hashedPassword,
                      status
                  });
                  res.json({ status: 1, msg: "Thank you for registering!" });
              }
          });
      }
  } catch (error) {
      // Handle error
      console.error("Error:", error);
      res.status(500).json({ status: 0, msg: "Internal Server Error" });
  }
});
//hotellogin
  app.post('/hotellogin', async (req, res) => {
    const { email, password ,status} = req.body;

    try {
        const result = await hotelregModel.find({ 'email': email });

        if (result.length > 0) {
            const pwd = result[0].password;
            const uid = result[0]._id;
            const hname = result[0].hname;
            const sts = result[0].status;
            console.log(sts)
            if (sts == 0) {
                // If status is 0, send "Cannot login" message
                res.json({ "status": 1, 'msg': "Wait for admin approval" });
                
            } else {
                bcrypt.compare(password, pwd, function (err, result1) {
                    if (err) {
                        // Handle bcrypt error
                        console.error(err);
                        res.json({ "status": 1, 'msg': "Error during password comparison" });
                    } else {
                        if (result1) {
                            res.json({ "status": 0, 'msg': "Successful", "userId": uid, 'hName': hname });
                        } else {
                            res.json({ "status": 1, 'msg': "Wrong password!!!" });
                        }
                    }
                });
            }
        } else {
            res.json({ "status": 1, 'msg': "Email not correct" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ "status": 1, 'msg': "Internal Server Error" });
    }
});


  app.get("/fetchAllhotel",async (req,res)=>{
    const result=await hotelregModel.find({"status":0});
    if(result.length>0){
      res.json(result)
    }
    else{
      res.json([])
    }
  })

  const confirm=async (req,res)=>{
    const id=req.params.id;
    await hotelregModel.updateOne({'_id':id},{'status':1})
    res.json("confirmed")
}
app.get('/api/confirm/:id', confirm);

//View food
app.get("/viewfood/:idn", async (req, res) => {
  try {
    const idn = req.params.idn;
    const result = await foodModel.find({ }); 

    if (result.length > 0) {
      res.json(result);
    } else {
      res.json([]); 
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


 //adapalan
   

 app.post("/addplan/:Name", async (req, res) => {
  try {
    const { amount, morningfood, eveningfood, dinner, duration } = req.body;
    const hotelname=req.params.Name
    // Assuming ID is coming from the request body
    await planModel.create({
      
      amount,
      hotelname,
      morningfood,
      eveningfood,
      dinner,
      duration
    });

    res.json({ status: 1, msg: "Upload successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 0, msg: "Upload failed" });
  }
});

app.get("/fetchplan", async (req, res) => {
  try {
    
   
    const result = await planModel.find({  });

    if (result.length > 0) {
      res.json(result);
    } else {
      res.json([]); 
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//order
app.post("/order/:userId/:cName", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cName = req.params.cName;
    
    // Find the plan based on the userId
    const plan = await planModel.findOne({ _id: userId });

    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }

    // Extract specific values from the plan object
    const { hotelname, morningfood, eveningfood, dinner, duration } = plan;
    let { amount } = plan;

    // Ensure the amount is numeric
    amount = parseFloat(amount);
    if (isNaN(amount)) {
      return res.status(400).json({ error: "Invalid amount: Amount must be a numeric value." });
    }

    // Create a new order using orderModel
    await orderModel.create({
      userId,
      cName,
      morningfood,
      eveningfood,
      dinner,
      duration,
      hotelname,
      amount
    });

    // Send a success response back to the client
    res.json({ status: 1, msg: "Subscription Added", "userId": userId, "amount": amount, "hotelname": hotelname });
  } catch (error) {
    // Handle errors
    console.error("Error adding subscription:", error);
    res.status(500).json({ status: 0, msg: "Failed to add subscription", error: error.toString() });
  }
});

//payment

app.post("/payment/:amount/:userId/:hotelname", async (req, res) => {
  try {
    const { amount, userId, hotelname } = req.params;
    const { number, expiry, cvv, name, phone, address } = req.body;

    // Create a new payment record using paymentModel
    await paymentModel.create({
      userId,
      number,
      expiry,
      cvv,
      name,
      amount,
      hotelname,
      phone,
      address
    });

    res.json({ status: 1, msg: "Your payment is successful!!!" });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ status: 0, msg: "Failed to process payment" });
  }
});


//vieworder

app.get("/viewsub/:cName", async (req, res) => {
  try {
    
    const cName = req.params.cName;
    const result = await orderModel.find({ 'cName': cName }); 
    
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json([]); 
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.get("/viewbuy/:cName", async (req, res) => {
  try {
    
    const cName = req.params.cName;
    const result = await buyModel.find({ 'cName': cName }); 
    
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json([]); 
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/hotelsub/:hName", async (req, res) => {
  try {
    
    const hName = req.params.hName;
    const result = await orderModel.find({ 'hotelname': hName }); 
   
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json([]); 
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/hotelbuy/:hName", async (req, res) => {
  try {
    
    const hName = req.params.hName;
    const result = await buyModel.find({ 'hotelname': hName }); 
   
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json([]); 
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/viewhpay/:hName", async (req, res) => {
  try {
    
    const hName = req.params.hName;
    const result = await paymentModel.find({ 'hotelname': hName }); 
   
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json([]); 
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete('/deletesub/:userId', async (req, res) => {
  await orderModel.deleteOne({ '_id': req.params.userId });
  res.json("data deleted successfully");
});





//addd order
app.post("/orderfood/:userId/:cName", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cName = req.params.cName;
    
    // Find the plan based on the userId
    const plan = await foodModel.findOne({ _id: userId });

    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }

    // Extract specific values from the plan object
    const { foodname, rate, hotelname, description} = plan;

    // Create a new order using orderModel
    await buyModel.create({
      userId,
      cName,
     foodname,
      rate,
      hotelname,
      description
    });

    // Send a success response back to the client
    res.json({ status: 1, msg: "Subscription Added","userId":userId,"rate":rate ,"hotelname":hotelname});
  } catch (error) {
    // Handle errors
    console.error("Error adding subscription:", error);
    res.status(500).json({ status: 0, msg: "Failed to add subscription" });
  }
});

app.get("/viewpay", async (req, res) => {
  try {
    
    
    const result = await paymentModel.find({ }); 
   
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json([]); 
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/feedbackview", async (req, res) => {
  try {
    
    
    const result = await feedModel.find({ }); 
   
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json([]); 
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post('/feedback/:cName', async (req, res) => {
  try {
    const cName = req.params.cName;
    const { feedback } = req.body;
    await feedModel.create({
      cName,
      feedback
    });
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Failed to submit feedback' });
  }
});
//approve
app.get('/api/confirm/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        hotel.approved = true; // Set approved to true
        await hotel.save();
        res.json({ message: 'Hotel approved successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.delete('/deletehotel/:userId', async (req, res) => {
  await hotelregModel.deleteOne({ '_id': req.params.userId });
  res.json("data deleted successfully");
});
//custreport
app.get("/custreport/:selectedMonth", async (req, res) => {
  try {
    const selectedMonth = req.params.selectedMonth;


    const startDate = new Date(new Date().getFullYear(), parseInt(selectedMonth) - 1, 1);
    const endDate = new Date(new Date().getFullYear(), parseInt(selectedMonth), 0, 23, 59, 59, 999);


    const result = await custregModel.find({
      createdAt: { $gte: startDate, $lte: endDate }
    });

    if (result.length > 0) {
      res.json(result);
    } else {
      res.json([]); 
    }
  } catch (error) {
    console.error("Error fetching customer details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//hotelreport
app.get("/hotelreport/:selectedMonth", async (req, res) => {
  try {
    const selectedMonth = req.params.selectedMonth;


    const startDate = new Date(new Date().getFullYear(), parseInt(selectedMonth) - 1, 1);
    const endDate = new Date(new Date().getFullYear(), parseInt(selectedMonth), 0, 23, 59, 59, 999);


    const result = await hotelregModel.find({
      createdAt: { $gte: startDate, $lte: endDate }
    });

    if (result.length > 0) {
      res.json(result);
    } else {
      res.json([]); 
    }
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//fecth approved hotels
app.get("/fetchhotel",async (req,res)=>{
  const result=await hotelregModel.find({status:1});
  if(result.length>0){
    res.json(result)
  }
  else{
    res.json([])
  }
})
//custom
app.post("/customise/:cName", async (req, res) => {
  const { food1,food2,food3,hotel,startDate,endDate,totalPrice,numberOfDays } = req.body;

  const cName = req.params.cName;
  try {
    await customiseModel.create({
      cName,
      food1,
      food2,
      food3,
      hotel,
      startDate,
      endDate,
      totalPrice,
      numberOfDays
      
    });
    res.json({ status: 1, msg: "SUCESSFULL","totalPrice":totalPrice ,"hotel":hotel });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ status: 0, msg: "Failed " });
  }
})
app.get("/viewhotels", async (req, res) => {
  try {
    
   
    const result = await hotelregModel.find({  }); 
    
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json([]); 
    }
  } catch (error) {
    console.error("Error fetching :", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/viewfoods/:selectedHotels", async (req, res) => {
  try {
    
    const Name = req.params.selectedHotels;
    const result = await foodModel.find({ 'Name': Name }); 
    
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json([]); 
    }
  } catch (error) {
    console.error("Error fetching :", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
