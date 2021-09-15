const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//works
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes:["id", "category_name"],

    indclude:[{
      attributes:["id", "product_name", "price", "stock", "category_id"],
      model: Product,
    }]
  })
  .then(dbCategoryData =>{
    if(!dbCategoryData){
      res.status(404).json({ message: 'No Category found with this id'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  })
});
//works
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where:{
      id: req.params.id
    },
    attributes:['id', 'category_name'],
    include:[{
      attributes: ["id", "product_name", "price", "stock", "category_id"],
      model: Product
    }]

  })
  .then(dbCategoryData =>{
    if(!dbCategoryData){
      res.status(404).json({ message: 'No Category found with this id'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});
//does not work
//double check this route, problem at JSON positon 15
router.post('/', (req, res) => {
  // create a new category
  Category.create({

    category_name: req.body.category_name,
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
 
  });
});
//works
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where:{
        id: req.params.id
      }
    }
  )
  .then(dbCategoryData =>{
    if(!dbCategoryData){
      res.status(404).json({ message: 'No category found with this id'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;


//Check with TA 
//does not work Post route
//delete Route doesnt work