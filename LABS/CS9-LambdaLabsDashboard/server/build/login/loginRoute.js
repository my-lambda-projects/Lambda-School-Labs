"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _express=require("express"),_express2=_interopRequireDefault(_express),_userModel=require("../Users/userModel.js"),_userModel2=_interopRequireDefault(_userModel),_jwtMiddleWare=require("../MiddleWare/jwtMiddleWare.js");function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var Router=_express2.default.Router();Router.get("/",function(a,b){b.send("you are logged-in ")}),Router.post("/",function(a,b){var c=a.body,d=c.email,e=c.password;_userModel2.default.findOne({email:d}).then(function(a){a.checkPassWord(e).then(function(c){if(c){var d=(0,_jwtMiddleWare.makeToken)(a),e=a._id;b.status(200).json({msg:"login successful",_id:e,token:d})}else b.send("Incorrect password")}).catch(function(){return b.send("Something went wrong. Please try again")})}).catch(function(){b.send("User not found")})}),exports.default=Router;