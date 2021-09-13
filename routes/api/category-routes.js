const router = require('express').Router();
const { regexp } = require('sequelize/types/lib/operators');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

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

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where:{
      id: req.params.id
    },
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

//double check this route
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    title: req.body.title.Category,
    post_url: reg.body.post_url
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
