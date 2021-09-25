'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.updatePassword=void 0;var _userModel=require('../Users/userModel'),_userModel2=_interopRequireDefault(_userModel),_bcrypt=require('bcrypt'),_bcrypt2=_interopRequireDefault(_bcrypt);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var updatePasswordError=function(a,b){a.send(b)},updatePassword=exports.updatePassword=function(a,b,c){var d=a.password,e=a.newPassword;_userModel2.default.findById(c).then(function(c){c.checkPassWord(d).then(function(d){d?(delete a.password,a.password=e,delete a.newPassword,c.set(a),c.save().then(function(a){var c=a.name,d=a.email,e=a.subscribed,f=a.subscribedDate;b.status(200).json({user:{name:c,email:d,subscribed:e,subscribedDate:f}})}).catch(function(){return updatePasswordError(b,'Error updating password. Please try again.')})):updatePasswordError(b,'Incorrect password')}).catch(function(){return updatePasswordError(b,'Error updating password. Please try again.')})})};