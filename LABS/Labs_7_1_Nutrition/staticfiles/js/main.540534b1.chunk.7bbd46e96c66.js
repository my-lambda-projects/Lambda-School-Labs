(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{125:function(e,t,a){e.exports=a.p+"static/media/spices.565717eb.png"},143:function(e,t,a){e.exports=a(290)},290:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(9),o=a.n(l),c=a(298),i=(a(148),a(11)),s=a(17),m=a(13),u=a(12),h=a(14),d=a(299),p=a(300),g=a(125),b=a.n(g),E=function(e){function t(){return Object(i.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:{background:"url(".concat(b.a,") no-repeat fixed center"),backgroundSize:"cover",height:"900px"}})}}]),t}(r.a.Component),f=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(m.a)(this,Object(u.a)(t).call(this))).state={username:"",token:""},e}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(E,null))}}]),t}(r.a.Component),v=a(126),y=a(293),C=a(20),j=a.n(C),O=a(99),w=a(294),k=a(39),S=a(22),I=a(292),R=a(296),T=I.a.Item,x=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).handleFormSubmit=function(e,t,n){e.preventDefault(),console.log("line number 13",a.state.cookingMethod,a.state.cookTime);var r=a.state,l=r.recipeTitle,o=r.cookTime,c=r.cookingMethod,i=r.recipeCategory,s=r.recipeCuisine,m=r.recipeIngredients,u=r.recipeInstructions,h=r.recipeYield,d=r.suitableForDiet;j.a.post("http://localhost:8000/api/recipe/",{recipeTitle:l,cookTime:o,cookingMethod:c,recipeCategory:i,recipeCuisine:s,recipeIngredients:m,recipeInstructions:u,recipeYield:h,suitableForDiet:d}).then(function(e){console.log("success"),a.props.history.push("/recipe")}).catch(function(e){return console.log("Form error at line 22")})},a.state={recipeTitle:"",cookTime:"",cookingMethod:"",recipeCategory:"",recipeCuisine:"",recipeIngredients:"",recipeInstructions:"",recipeYield:"",suitableForDiet:""},a.handleChange=a.handleChange.bind(Object(S.a)(Object(S.a)(a))),a}return Object(h.a)(t,e),Object(s.a)(t,[{key:"handleChange",value:function(e){this.setState(Object(k.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(I.a,{onSubmit:function(t){return e.handleFormSubmit(t)}},r.a.createElement(T,{label:"Recipe Title"},r.a.createElement(R.a,{name:"RecipeTitle",placeholder:"Recipe Title",onChange:this.handleChange})),r.a.createElement(T,{label:"Cook Time: "},r.a.createElement(R.a,{name:"CookTime",placeholder:"How long it will take?",onChange:this.handleChange})),r.a.createElement(T,{label:"Cooking Method: "},r.a.createElement(R.a,{name:"CookingMethod",placeholder:"Baking, steaming, frying...",onChange:this.handleChange})),r.a.createElement(T,{label:"Recipe Category: "},r.a.createElement(R.a,{name:"RecipeCategory",placeholder:"Baking, steaming, frying ...",onChange:this.handleChange})),r.a.createElement(T,{label:"Recipe Cuisine: "},r.a.createElement(R.a,{name:"RecipeCuisine",placeholder:"So, what cusine is this?...",onChange:this.handleChange})),r.a.createElement(T,{label:" Recipe Ingredients: "},r.a.createElement(R.a,{name:"RecipeIngredients",placeholder:"Step by step preperation instructions goes here...",onChange:this.handleChange})),r.a.createElement(T,{label:"Recipe Instructions: "},r.a.createElement(R.a,{name:"RecipeInstructions",placeholder:"Step by step preperation instructions goes here...",onChange:this.handleChange})),r.a.createElement(T,{label:"Recipe Yield: "},r.a.createElement(R.a,{name:"RecipeYield",placeholder:"how many in number...",onChange:this.handleChange})),r.a.createElement(T,{label:"Suitable For Diet: "},r.a.createElement(R.a,{name:"SuitableForDiet",placeholder:"Suitable For what Diet...",onChange:this.handleChange})),r.a.createElement(T,null,r.a.createElement(O.a,{type:"primary",htmlType:"submit"},"Create Recipe"))))}}]),t}(r.a.Component),M=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).showModal=function(){a.setState({visible:!0})},a.handleOk=function(){a.props.history.push("/recipe")},a.handleCancel=function(){a.setState({visible:!1})},a.componentDidMount=function(){console.log("newreview page loaded")},a.state={loading:!1,visible:!1},a}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.state,t=e.visible;e.loading;return r.a.createElement("div",null,r.a.createElement(O.a,{type:"primary",onClick:this.showModal},"Add a new recipe"),r.a.createElement(w.a,{footer:null,visible:t,title:"New Recipe",onOk:this.handleOk,onCancel:this.handleCancel},r.a.createElement(x,null)))}}]),t}(r.a.Component),D=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={recipes:[]},a.componentDidMount=function(){var e=localStorage.getItem("username");console.log("In recipe list view username is:",e)},a}return Object(h.a)(t,e),t}(r.a.Component),F=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).componentDidMount=function(){var e=localStorage.getItem("jwt"),t=localStorage.getItem("username");t?(j()({method:"get",url:"http://127.0.0.1:8000/api/recipe/",data:{username:t,jwt:e}}).then(j.a.spread(function(e){console.log("My Recipe page get reuest success data: ",e),a.setState({recipes:e.data})})).catch(function(e){return console.log("Myrecipe page get request error:",e)}),a.props.history.push("/recipe")):a.props.history.push("/login")},a.addRecipe=function(){j.a.get("makes call to backend and get all stored recipes under this username").then(function(e){a.setState({data:Object(v.a)({},a.recipes,{recipes:e.data})})}).catch(function(e){return console.log(e.warn)})},a.state={data:{recipes:[]}},a}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=r.a.createElement("div",null,r.a.createElement("h1",null," Here you will see your saved recipes"),r.a.createElement("h4",null,"If you have recipes under your username, you will be seeing card view"),r.a.createElement("h4",null,"Otherwise, you can add recipes here"),r.a.createElement(y.a,{style:{justifyContent:"center"}},r.a.createElement("div",null,r.a.createElement(M,{buttonLabel:"+",addRecipe:this.addRecipe})))),a=r.a.createElement("div",null,r.a.createElement(y.a,{style:{width:"100px",justifyContent:"center"}},r.a.createElement("div",null,r.a.createElement("h4",null," Add a new recipe"),r.a.createElement(M,{buttonLabel:"+",addRecipe:this.addRecipe}))),r.a.createElement(y.a,{style:{width:"100px",justifyContent:"center"}},r.a.createElement("div",null,this.state.data.recipes.map(function(t){return r.a.createElement(D,Object.assign({},t,{removeReview:e.handleRemove}))}))));return r.a.createElement("div",null,0===this.state.data.recipes.length?t:a)}}]),t}(r.a.Component),U=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={ingredients:{}},a.handleDelete=function(e){var t=a.props.match.params.ingredientID;j.a.get("http://127.0.0.1.8000/api/".concat(t))},a}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.ingredient;console.log(JSON.stringify(t)),j.a.get("http://127.0.0.1.8000/api/".concat(t)).then(function(t){e.setState({ingredients:t.data}),console.log(t.data)}).catch(function(e){return console.log("Caught error")})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Ingredient Modal view"),r.a.createElement("h2",null,"under progress..."),r.a.createElement(y.a,{CookTime:this.state.ingredients.CookTime},r.a.createElement("p",null,this.state.ingredients.CookingMethod)),r.a.createElement(x,{requestType:"put",ingId:this.props.match.params.ingId,btnText:"Update"}),r.a.createElement("form",{onSubmit:this.handleDelete},r.a.createElement(O.a,{type:"danger",htmlType:"submit"},"Delete")))}}]),t}(r.a.Component),P=I.a.Item,L=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).handleLogin=function(e){if(e.preventDefault(),a.state.username&&a.state.password){var t=a.state,n=t.username,r=t.password;console.log("Username, password state: ",a.state),console.log("Username at local storage: ",localStorage.getItem(n)),j.a.post("http://127.0.0.1:8000/auth/login/",{username:n,password:r}).then(function(e){console.log("Username at local storage in success: ",localStorage.getItem(n)),console.log("success",e),localStorage.setItem("token",e.data.jwt),localStorage.setItem("username",a.state.username),console.log("just username:",e.data.username),console.log("after successful axios call",{status:e.status}),a.setState({error:!1}),n&&a.props.history.push("/recipe")}).catch(function(e){console.log("Username at local storage in error: ",localStorage.getItem(n)),a.setState({message:e.response.data.message}),console.log("there was an error",e),a.setState({password:""})})}else a.setState({error:!0,message:"Please provide registered username and password"})},a.state={username:"",password:"",message:"Registered users can sign in here."},a.handleChange=a.handleChange.bind(Object(S.a)(Object(S.a)(a))),a.handleLogin=a.handleLogin.bind(Object(S.a)(Object(S.a)(a))),a}return Object(h.a)(t,e),Object(s.a)(t,[{key:"handleChange",value:function(e){this.setState(Object(k.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{style:{background:"#ECECEC",padding:"30px"}},r.a.createElement("div",{style:{color:"#990000",padding:"30px",fontSize:"30px"}},this.state.message),r.a.createElement(y.a,{title:"Login",bordered:!1,style:{width:350}},r.a.createElement(I.a,{onSubmit:function(t){return e.handleLogin(t)}},r.a.createElement(P,{label:"Username : "},r.a.createElement(R.a,{name:"username",placeholder:"Username...",onChange:this.handleChange})),r.a.createElement(P,{label:"Password : "},r.a.createElement(R.a,{name:"password",placeholder:"Mix of 8 chars, numbers and symbols...",onChange:this.handleChange})),r.a.createElement(P,null,r.a.createElement(O.a,{type:"primary",htmlType:"submit"},"Sign In")))))}}]),t}(r.a.Component),A=I.a.Item,H=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).handleFormSubmit=function(e){e.preventDefault();var t=a.state,n=t.username,r=t.password,l=t.confirmPassword,o=t.email;console.log("username:",n),console.log("password:",r),console.log("confirmPassword:",l),r===l?(a.setState({username:n,password:r,confirmPassword:l,email:o}),localStorage.setItem("username",a.state.username),j.a.post("http://127.0.0.1:8000/auth/register/",{username:n,password:r,email:o}).then(function(e){console.log("success",e.data),localStorage.setItem("username",n),localStorage.setItem("token",e.data.jwt),console.log("after successful axios call",{status:e.status}),a.props.history.push("/recipe")}).catch(function(e){console.log("there was an error",e,e.response),console.log("No data returned from backend.that is the above error"),a.setState({})})):a.setState({message:" Password mismatch"})},a.state={username:"",password:"",confirmPassword:"",email:"",message:"All fields are required."},a.handleChange=a.handleChange.bind(Object(S.a)(Object(S.a)(a))),a.handleFormSubmit=a.handleFormSubmit.bind(Object(S.a)(Object(S.a)(a))),a}return Object(h.a)(t,e),Object(s.a)(t,[{key:"handleChange",value:function(e){this.setState(Object(k.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{style:{background:"#ECECEC",padding:"30px"}},r.a.createElement("div",{style:{color:"#990000",padding:"30px",fontSize:"30px"}},this.state.message),r.a.createElement(y.a,{title:"Register ",bordered:!1,style:{width:350}},r.a.createElement(I.a,{onSubmit:function(t){return e.handleFormSubmit(t)}},r.a.createElement(A,{label:"Username : "},r.a.createElement(R.a,{name:"username",placeholder:"Username...",onChange:this.handleChange})),r.a.createElement(A,{label:"Password : "},r.a.createElement(R.a,{name:"password",placeholder:"Mix of 8 chars, numbers and symbols...",onChange:this.handleChange})),r.a.createElement(A,{label:"Confirm Password : "},r.a.createElement(R.a,{name:"confirmPassword",placeholder:"Same as above...",onChange:this.handleChange})),r.a.createElement(A,{label:"Email : "},r.a.createElement(R.a,{name:"email",placeholder:"Type in valid email...",onChange:this.handleChange})),r.a.createElement(A,null,r.a.createElement(O.a,{type:"primary",htmlType:"submit"},"Sign Up")))))}}]),t}(r.a.Component),N=function(e){function t(){return Object(i.a)(this,t),Object(m.a)(this,Object(u.a)(t).call(this))}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){localStorage.removeItem("username",""),localStorage.removeItem("token",""),this.props.history.push("/")}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h2",null," You have successfully logged out.  "),r.a.createElement("br",null),r.a.createElement("h2",null," Do you want to sign in? "),r.a.createElement("div",null,r.a.createElement(O.a,{type:"primary",htmlType:"submit"}," Back to home ")))}}]),t}(r.a.Component),Y=a(297),z=Y.a.Content,B=function(){return r.a.createElement(z,{style:{padding:"0 50px",height:"100vh"}},r.a.createElement(d.a,null,r.a.createElement(p.a,{exact:!0,path:"/",component:f}),r.a.createElement(p.a,{path:"/recipe",component:F}),r.a.createElement(p.a,{path:"/login",component:L}),r.a.createElement(p.a,{path:"/register",component:H}),r.a.createElement(p.a,{path:"/ing/:ingredientid",component:U}),r.a.createElement(p.a,{path:"/logout",component:N})))},q=a(295),J=a(291),W=Y.a.Header,$=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).handlelogout=function(){a.props.history.push("/"),localStorage.removeItem("username",""),localStorage.removeItem("token","")},a}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=localStorage.getItem("username");return e?r.a.createElement(W,null,r.a.createElement("div",{className:"logo"}),r.a.createElement(q.a,{theme:"dark",mode:"horizontal",style:{lineHeight:"64px"}},r.a.createElement(q.a.Item,{key:"1"},"Hi ",e),r.a.createElement(q.a.Item,{key:"2"},r.a.createElement(J.a,{to:"/recipe"},"My Recipes")),r.a.createElement(q.a.Item,{key:"3"},r.a.createElement(J.a,{to:"/logout"},"Logout")))):r.a.createElement(W,null,r.a.createElement("div",{className:"logo"}),r.a.createElement(q.a,{theme:"dark",mode:"horizontal",style:{lineHeight:"64px"}},r.a.createElement(q.a.Item,{key:"1"},r.a.createElement(J.a,{to:"/login"},"Sign In")),r.a.createElement(q.a.Item,{key:"2"},r.a.createElement(J.a,{to:"/register"},"Sign Up"))))}}]),t}(r.a.Component),G=Y.a.Footer,K=function(){return r.a.createElement(G,{style:{textAlign:"center",background:"#646404"}},"Nutrition Team")},Q=function(e){function t(){return Object(i.a)(this,t),Object(m.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement($,null),r.a.createElement(B,null),r.a.createElement(K,null))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(c.a,null,r.a.createElement("div",null,r.a.createElement(Q,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[143,2,1]]]);
//# sourceMappingURL=main.540534b1.chunk.js.map