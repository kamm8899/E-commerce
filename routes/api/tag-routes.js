const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
//works
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes:["id", "tag_name"],
    include:[
      {
        model: Product,
        attributes:["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
        as: "ProductTag",
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });

});

//GET ID route
//works
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where:{
      id: req.params.id
    },
    include:[{
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      model: Product,
      through: ProductTag, 
      as: "ProductTag"
    },
    ]
})
.then(dbTagData =>{
  if(!dbTagData){
    res.status(404).json({ message: 'No Tag found with this id'});
    return;
  }
  res.json(dbTagData);
})
.catch(err =>{
  console.log(err);
  res.status(500).json(err);
})
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
