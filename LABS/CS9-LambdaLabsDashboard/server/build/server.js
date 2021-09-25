"use strict";var _express=require("express"),_express2=_interopRequireDefault(_express),_mongoose=require("mongoose"),_mongoose2=_interopRequireDefault(_mongoose),_path=require("path"),_path2=_interopRequireDefault(_path),_keys=require("./keys"),_keys2=_interopRequireDefault(_keys),_bodyParser=require("body-parser"),_bodyParser2=_interopRequireDefault(_bodyParser),_helmet=require("helmet"),_helmet2=_interopRequireDefault(_helmet),_cookieSession=require("cookie-session"),_cookieSession2=_interopRequireDefault(_cookieSession),_passport=require("passport"),_passport2=_interopRequireDefault(_passport),_cors=require("cors"),_cors2=_interopRequireDefault(_cors),_classRoute=require("./Classes/classRoute"),_classRoute2=_interopRequireDefault(_classRoute),_projectsRoute=require("./projects/projectsRoute"),_projectsRoute2=_interopRequireDefault(_projectsRoute),_userRoute=require("./Users/userRoute.js"),_userRoute2=_interopRequireDefault(_userRoute),_loginRoute=require("./login/loginRoute.js"),_loginRoute2=_interopRequireDefault(_loginRoute),_chargeRoute=require("./charge/chargeRoute.js"),_chargeRoute2=_interopRequireDefault(_chargeRoute),_googleRedirect=require("./google/googleRedirect.js"),_googleRedirect2=_interopRequireDefault(_googleRedirect),_googleRoute=require("./google/googleRoute.js"),_googleRoute2=_interopRequireDefault(_googleRoute),_ExternalApiRoutes=require("./ExternalApis/ExternalApiRoutes"),_ExternalApiRoutes2=_interopRequireDefault(_ExternalApiRoutes),_ValidateTokenRoute=require("./Token/ValidateTokenRoute"),_ValidateTokenRoute2=_interopRequireDefault(_ValidateTokenRoute);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}require("dotenv").config();var Server=(0,_express2.default)(),sessionOptions={maxAge:86400000,keys:[process.env.cookieKey]},staticFiles=_express2.default.static(_path2.default.join(__dirname,"../../front-end/build"));Server.use((0,_cors2.default)()),Server.use((0,_helmet2.default)()),Server.use(_bodyParser2.default.json()),Server.use(function(a,b,c){b.setHeader("Access-Control-Allow-Origin","*"),b.setHeader("Access-Control-Allow-Credentials","true"),b.setHeader("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT,DELETE"),b.setHeader("Access-Control-Allow-Headers","Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"),b.setHeader("Cache-Control","no-cache"),c()}),Server.use(staticFiles);var port=process.env.PORT||4e3;_mongoose2.default.connect(process.env.MONGO_URL,{useNewUrlParser:!0}).then(function(){}).catch(function(){}),Server.get("/",function(a,b){b.status(200).json({msg:"api is running!"})}),Server.use("/classes",_classRoute2.default),Server.use("/projects",_projectsRoute2.default),Server.use("/users",_userRoute2.default),Server.use("/login",_loginRoute2.default),Server.use("/charge",_chargeRoute2.default),Server.use("/auth/google/callback",_googleRedirect2.default),Server.use("/google",_googleRoute2.default),Server.use("/externalApis",_ExternalApiRoutes2.default),Server.use("/token",_ValidateTokenRoute2.default),Server.use("*",staticFiles),Server.listen(port,function(){});