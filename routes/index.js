
var express = require('express');
var router = express.Router();

module.exports = function(admin) {
  const db = admin.firestore();


  /* This function reads and displays the list of listings */  
  router.get('/listings', async function(req, res, next) {
    const listingsRef = db.collection('Listings');
    const data = await listingsRef.get();
    data.forEach((doc) => {
      console.log(doc.data());
    })
  });


  /* This function reads and displays the list of reviews  */
  router.get('/reviews', async function(req, res, next) {
    const reviewsRef = db.collection('Reviews');
    const data = await reviewsRef.get();
    data.forEach((doc) => {
      console.log(doc.data());
    })
    res.send(data);
  });


  /* Query for listings for a fruit */
  router.get('/listings/:id', async function(req, res, next) {
      const fruitRef = db.collection('Listings');
      const fruit_obj = await fruitRef.where('produce', '==', req.params.id).get();
      if(fruit_obj.empty){
        console.log('No matching documents...');
        return;
      }
      fruit_obj.forEach(doc => {
        console.log(doc.data());
      });
    res.send(fruit_obj);
  });


  /*Query using req.query localhost:3000/query?order=["produce name"] */
  router.get('/query' , async function(req, res, next) {
    const fruitRef = db.collection('Listings');
    const req_obj = await fruitRef.where('produce', '==', req.query.order).get();
    console.log(req.query);
    if(req_obj.empty){
      console.log('No matching documents...');
      return;
    }
    req_obj.forEach(doc => {
      console.log(doc.data());
    });
    res.send(req_obj);
    console.log('Here are the answers to your request...');
  });


  /* Compound query using req.query localhost:3000/query?order=["produce name"]  ---BROKEN---*/
  router.get('/query' , async function(req, res, next) {
    const fruitRef = db.collection('Listings');
    const req_obj = await fruitRef.where('produce', '==', req.query.order);
    req_obj = fruitRef.where('price', '<', 10).get();
    console.log(req.query);
    if(req_obj.empty){
      console.log('No matching documents...');
      return;
    }
    req_obj.forEach(doc => {
      console.log(doc.data());
    });
    res.send(req_obj);
    console.log('Here are the answers to your request...');
  });
  /* Query to update the pricing of products ---BROKEN---*/
  router.get('/price:id' , async function(req, res, next) {
    const fruitRef = db.collection('Listings');
      const fruit_obj = await fruitRef.where('produce', '==', req.query.name).get();
      fruit_obj.price = req.params.id;
      console.log('Here are the updated prices!');
      fruit_obj.forEach(doc => {
        console.log(doc.data());
      });
    res.send(fruit_obj);
  });

  /* Query to delete listings ---BROKEN---*/
  router.get('/delete/listings' , async function(req, res, next) {
    const fruitRef = db.collection('Listings');
      const fruit_obj = await fruitRef.where('produce', '==', req.params.name).set();
      fruit_obj.price = req.params.num;
      console.log('Here are the updated prices!');
      fruit_obj.forEach(doc => {
        console.log(doc.data());
      });
    res.send(fruit_obj);
  });
  return router;
}


//Code i made need later for reference 
    // const orange = await db.collection('Listings').add({
        //   price: 5,
        //   produce: "orange",
        //   quanitity: 100,
        // });
        // console.log('Added document with ID ', orange.id);
        // //orange.send(data);
        // const grapes = await db.collection('Listings').add({
        //   price: 10,
        //   produce: "grapes",
        //   quanitity: 1000,
        // });
        // console.log('Added document with ID ', grapes.id);
        // //grapes.send(data);
        // const nuts = await db.collection('Listings').add({
        //   price: 7,
        //   produce: "deezenuts",
        //   quanitity: 50,
        // });
        // console.log('Added document with ID ', nuts.id);
        // //nuts.send(data);
        // res.send(data);
        //   const fruitRef = db.collection('Listings');
        //   const fruit_obj = await fruitRef.where('produce', '==', 'grapes').get();
        //   if(fruit_obj.empty){
        //     console.log('No matching documents...');
        //     return;
        //   }
        //   fruit_obj.forEach(doc => {
        //     console.log('No matching documents.');
        //   });

    /* -----Inserts A Review With A Auto-Generated ID--------
    const insert = await db.collection('Reviews').add({
      Comments:"Poggers",
      Ratings: 5,
    });
    console.log('Added document with ID ', insert.id);
    insert.send(data);
    */