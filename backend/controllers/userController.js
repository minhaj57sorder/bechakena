import expressAsyncHandler from "express-async-handler";
import User from '../models/userModel.js'

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
            token: null,
        })
    }else{
        res.json({
            message: "Email or password not matched"
        })
    }
})

export {
    authUser
}