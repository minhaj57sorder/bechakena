import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import generateToken from "../utils/generateToken.js";

const authUser =  expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user && await user.matchPassword(password)){
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAuth: user.isAuth,
          token: generateToken(user._id),
        })
      }else{
      res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.status(401)
      // res.json({message:"error"})
      throw new Error('Invalid email or password')
    }
})

const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body
  
    const userExists = await User.findOne({ email })
    
  
    if (userExists) {
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.status(400)
      throw new Error('User already exists')
    }
  
    const user = await User.create({
      name,
      email,
      password,
    })
  
    if (user) {
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
  

const getUserProfile =  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.status(404)
        throw new Error('User not found')
    }
})

export {
    authUser,
    registerUser,
    getUserProfile,
}