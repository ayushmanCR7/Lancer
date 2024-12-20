import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
    unique: false
  },
  img:{
    type: String,
    required: false
  },
  country:{
    type: String,
    required: false
    
  },
  phoneno:{
    type: String,
    required: false
   
  },
  desc:{
    type: String,
    required: false
   
  },
  isSeller:{
    type: Boolean,
    default: false
  }, 
},{
    timestamps: true
});
export default mongoose.model("User",UserSchema)