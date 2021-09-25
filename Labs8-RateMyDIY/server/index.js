const server = require("./server");

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n=== Listening on port: ${port} ===\n`);
});

// const express = require('express');
// const cors = require('cors');

// const server = express();
// server.use(express.json());
// server.use(cors());

// let myProjects = [
//     {
//       id: 1,
//       name: "Micro brew IPA",
//       star_count: 4.2,
//       author: "alejandrok",
//       photo_url: "http:// someURL.com"
//     },
//     {
//       id: 2,
//       name: "Steak Recipe",
//       star_count: 4.2,
//       author: "john",
//       photo_url: "someURL.com"
// 	},
// 	{
// 		id: 3,
// 		name: "Steak Recipe",
// 		star_count: 4.2,
// 		author: "john",
// 		photo_url: "someURL.com"
// 	  },
// 	  {
// 		id: 4,
// 		name: "Steak Recipe",
// 		star_count: 4.2,
// 		author: "john",
// 		photo_url: "someURL.com"
// 	  }
//   ]

//   let reviewList = [
//     {
//       id: 1,
//       name: "Alejandrok",
//       star_count: 4.2,
//       author: "alejandrok",
//       photo_url: "http:// someURL.com"
//     },
//     {
//       id: 2,
//       name: "Max",
//       star_count: 4.2,
//       author: "john",
//       photo_url: "someURL.com"
//     },
//     {
//       id: 1,
//       name: "Mike",
//       star_count: 4.2,
//       author: "alejandrok",
//       photo_url: "http:// someURL.com"
//     },
//     {
//       id: 2,
//       name: "David",
//       star_count: 4.2,
//       author: "john",
//       photo_url: "someURL.com"
//     },
//     {
//       id: 2,
//       name: "Tristen",
//       star_count: 4.2,
//       author: "john",
//       photo_url: "someURL.com"
//     }
//   ]

//   let popularMakers = [
//     {
//       id: 1,
//       name: "Alejandrok",
//       star_count: 4.2,
//       author: "alejandrok",
//       photo_url: "http:// someURL.com"
//     },
//     {
//       id: 2,
//       name: "Max",
//       star_count: 4.2,
//       author: "john",
//       photo_url: "someURL.com"
//     },
//     {
//       id: 1,
//       name: "Mike",
//       star_count: 4.2,
//       author: "alejandrok",
//       photo_url: "http:// someURL.com"
//     },
//     {
//       id: 2,
//       name: "David",
//       star_count: 4.2,
//       author: "john",
//       photo_url: "someURL.com"
//     },
//     {
//       id: 2,
//       name: "Tristen",
//       star_count: 4.2,
//       author: "john",
//       photo_url: "someURL.com"
//     }
//   ]

//   server.get('/api/reviewList', (req, res) => {
// 	res.json(reviewList);
//   });

//   server.get('/api/popularMakers', (req, res) => {
// 	res.json(popularMakers);
//   });

// server.get('/api/myProjects', (req, res) => {
//   res.json(myProjects);
// });

// const port = process.env.PORT || 5000;
// server.listen(port, () => {
// 	console.log(`\n=== Listening on port: ${port} ===\n`);
// });

