/*const mongoose=require("mongoose")
main().catch((err)=>{console.log(err)});
async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/project');
  console.log("database connected......!")
}
//schema
const userSchema=new mongoose.Schema({
    fullname:String,
    email:String,
    crs:String,
    password:String

},{timestamps:true})
//model
const userModel=new mongoose.model('user_tbl',userSchema)
module.exports={userModel}
*/

const mongoose=require("mongoose")
main().catch((err)=>{console.log(err)});
async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/fooddelivery');
  console.log("database connected......!")
}
//schema
const custSchema=new mongoose.Schema({
  cname:String,
  address:String,
  contact:Number,
  email:String,
  password:String
},{timestamps:true})
//model
const custregModel=new mongoose.model('custreg',custSchema)
const hotelSchema=new mongoose.Schema({
  reg_id:Number,
  hname:String,
  address:String,
  contact:Number,
  email:String,
  password:String,
  status:{type:String,default:0}
},{timestamps:true})
const hotelregModel=new mongoose.model('hotelreg',hotelSchema)

//foodschema
const foodSchema=new mongoose.Schema({
  foodname:String,
  rate:Number,
  Name:String,
  description:String,
  image:String

},{timestamps:true})

const foodModel=new mongoose.model('food',foodSchema)

//planschema
const planSchema=new mongoose.Schema({
  
  amount:{type:String},
  morningfood:{type:String},
  eveningfood:{type:String},
  dinner:{type:String},
  duration:{type:String},
  hotelname:{type:String}


})
const planModel=new mongoose.model('subscription',planSchema)

//order

const orderSchema=new mongoose.Schema({
 
  
 userId:{type:String},
 cName:{type:String},
  morningfood:{type:String},
  eveningfood:{type:String},
  dinner:{type:String},
  duration:{type:String},
  hotelname:{type:String},
  amount:{type:Number}


})
const orderModel=new mongoose.model('order',orderSchema)

const paymentSchema = new mongoose.Schema({
  userId: { type: String },
  number: { type: Number },
  expiry: { type: String },
  cvv: { type: Number },
  name: { type: String },
  amount: { type: Number },
  hotelname: { type: String },
  phone: { type: String }, 
  address: { type: String }
});

const paymentModel = mongoose.model('payents', paymentSchema);

const buySchema=new mongoose.Schema({
  
  userId: { type: String },
  cName:{type:String},
  foodname:{type:String},
  rate:{type:String},
  hotelname:{type:String},
  decsription:{type:String}

})
const buyModel=new mongoose.model('buy',buySchema)


const feedSchema=new mongoose.Schema({
  
 cName: { type: String },
  feedback:{type:String}
  

})
//customisation
const customiseSchema=new mongoose.Schema({
  cName:String,
  food1:String,
  food2:String,
  food3:String,
  
  hotel:String,
  startDate:Date,
  endDate:Date,
  totalPrice:Number,
  numberOfDays:Number
  
  
  
 

},{timestamps:true})

const customiseModel=new mongoose.model('customise',customiseSchema)
const feedModel=new mongoose.model('feedback',feedSchema)
module.exports={
  custregModel,hotelregModel,foodModel,planModel,orderModel,paymentModel,buyModel,feedModel,customiseModel
}


