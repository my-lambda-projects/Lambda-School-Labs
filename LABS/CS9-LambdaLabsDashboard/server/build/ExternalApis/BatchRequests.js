'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.getBoardID=exports.fetchClassProgress=exports.fetchDashboardData=void 0;var _toConsumableArray2=require('babel-runtime/helpers/toConsumableArray'),_toConsumableArray3=_interopRequireDefault(_toConsumableArray2),_slicedToArray2=require('babel-runtime/helpers/slicedToArray'),_slicedToArray3=_interopRequireDefault(_slicedToArray2),_regenerator=require('babel-runtime/regenerator'),_regenerator2=_interopRequireDefault(_regenerator),_promise=require('babel-runtime/core-js/promise'),_promise2=_interopRequireDefault(_promise),_asyncToGenerator2=require('babel-runtime/helpers/asyncToGenerator'),_asyncToGenerator3=_interopRequireDefault(_asyncToGenerator2),_axios=require('axios'),_axios2=_interopRequireDefault(_axios),_Github=require('../Helpers/Github'),_Github2=_interopRequireDefault(_Github),_Trello=require('../Helpers/Trello'),_Trello2=_interopRequireDefault(_Trello),_Arrays=require('../Helpers/Arrays');function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}require('dotenv').config();var trelloKey=process.env.TRELLO_KEY,trelloToken=process.env.TRELLO_TOKEN,auth='?key='+trelloKey+'&token='+trelloToken,gha={headers:{Authorization:'bearer '+process.env.GITHUB_TOKEN}},fetchDashboardData=exports.fetchDashboardData=function(){var a=(0,_asyncToGenerator3.default)(_regenerator2.default.mark(function a(b,c){var d;return _regenerator2.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,_promise2.default.all([_axios2.default.get('https://api.trello.com/1/boards/'+c+'/members'+auth),_axios2.default.get('https://api.trello.com/1/boards/'+c+'/cards'+auth),_axios2.default.get('https://api.trello.com/1/boards/'+c+'/lists'+auth),_axios2.default.get('https://api.github.com/repos/Lambda-School-Labs/'+b+'/pulls?state=closed&page=1',gha),_axios2.default.get('https://api.github.com/repos/Lambda-School-Labs/'+b+'/pulls?state=closed&page=2',gha),_axios2.default.get('https://api.github.com/repos/Lambda-School-Labs/'+b+'/pulls?state=closed&page=3',gha),_axios2.default.get('https://api.github.com/repos/Lambda-School-Labs/'+b+'/pulls?state=closed&page=4',gha),_axios2.default.get('https://api.github.com/repos/Lambda-School-Labs/'+b+'/pulls?state=closed&page=5',gha),_axios2.default.get('https://api.github.com/repos/Lambda-School-Labs/'+b+'/pulls?state=closed&page=6',gha),_axios2.default.get('https://api.github.com/repos/Lambda-School-Labs/'+b+'/pulls?state=closed&page=7',gha),_axios2.default.get('https://api.github.com/repos/Lambda-School-Labs/'+b+'/contributors',gha)]);case 3:if(d=a.sent,!d){a.next=8;break}return a.next=7,parseData(d,b);case 7:return a.abrupt('return',a.sent);case 8:return a.abrupt('return',!1);case 11:return a.prev=11,a.t0=a['catch'](0),a.abrupt('return',!1);case 14:case'end':return a.stop();}},a,void 0,[[0,11]])}));return function(){return a.apply(this,arguments)}}(),fetchClassProgress=exports.fetchClassProgress=function(){var a=(0,_asyncToGenerator3.default)(_regenerator2.default.mark(function a(b){var c,d,e,f,g;return _regenerator2.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,_promise2.default.all([_axios2.default.get('https://api.trello.com/1/boards/'+b+'/members'+auth),_axios2.default.get('https://api.trello.com/1/boards/'+b+'/cards'+auth),_axios2.default.get('https://api.trello.com/1/boards/'+b+'/lists'+auth)]);case 3:if(c=a.sent,!c){a.next=9;break}if(!Array.isArray(c)){a.next=8;break}return d=(0,_slicedToArray3.default)(c,3),e=d[0],f=d[1],g=d[2],a.abrupt('return',new _Trello2.default(null,e.data,f.data,g.data,!1));case 8:return a.abrupt('return',!1);case 9:return a.abrupt('return',!1);case 12:return a.prev=12,a.t0=a['catch'](0),a.abrupt('return',!1);case 15:case'end':return a.stop();}},a,void 0,[[0,12]])}));return function(){return a.apply(this,arguments)}}(),getBoardID=exports.getBoardID=function(){var a=(0,_asyncToGenerator3.default)(_regenerator2.default.mark(function a(b){var c,d,e;return _regenerator2.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return c=void 0,d=void 0,a.prev=1,a.next=4,_axios2.default.get(b+'.json'+auth);case 4:e=a.sent,e&&(c=e.data.id,d=!1),a.next=12;break;case 8:a.prev=8,a.t0=a['catch'](1),c=null,d=!0;case 12:return a.abrupt('return',{id:c,error:d});case 13:case'end':return a.stop();}},a,void 0,[[1,8]])}));return function(){return a.apply(this,arguments)}}(),handleError=function(){return!1},getValidUsers=function(a){return(0,_Arrays.arrayFilter)(a,function(a){var b=a.name,c=b.split(' '),d=(0,_slicedToArray3.default)(c,2),e=d[0],f=d[1];if('null'!==b&&e&&f)return a})},parseData=function(){var a=(0,_asyncToGenerator3.default)(_regenerator2.default.mark(function a(b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;return _regenerator2.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return d=(0,_slicedToArray3.default)(b,11),e=d[0],f=d[1],g=d[2],h=d[3],i=d[4],j=d[5],k=d[6],l=d[7],m=d[8],n=d[9],o=d[10],p=[].concat((0,_toConsumableArray3.default)(h.data),(0,_toConsumableArray3.default)(i.data),(0,_toConsumableArray3.default)(j.data),(0,_toConsumableArray3.default)(k.data),(0,_toConsumableArray3.default)(l.data),(0,_toConsumableArray3.default)(m.data),(0,_toConsumableArray3.default)(n.data)),a.next=4,(0,_Github2.default)(o.data,p,gha);case 4:return q=a.sent,r=new _Trello2.default(q,e.data,f.data,g.data,!0),s=r.trello,t=r.completeness,u=r.updatedTeamStats,v=r.totalCards,w=r.inProgress,a.abrupt('return',{project:c,team:getValidUsers(u),trello:s,totalCards:v,inProgress:w,completeness:t});case 7:case'end':return a.stop();}},a,void 0)}));return function(){return a.apply(this,arguments)}}();