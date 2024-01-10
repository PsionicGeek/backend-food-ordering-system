const Category = require('../models/categorySchema')
const Dish = require('../models/dishSchema')

//=============================================================================================================================
const addDish = async(req, res)=>{
    const dishObject  = req.body; //the passed category name must exist
  
    //extract the category name
    const category_name = dishObject.category_name;
    delete dishObject.category_name
  
    //find the category in document
    const foundCategory = await Category.findOne({name : category_name})
    if (foundCategory == null)
       res.status(401).json({msg : 'Category not found'})
    dishObject.category = foundCategory;
  
    //create a new dish
    const newDish = await Dish.create(dishObject);
  
    if (newDish)
      res.status(200).json(newDish)
    else
      res.status(401).json({ message: 'Cannot add dish (Invalid or missing details)' })
}
//===============================================================================================================================
const addCategory = async(req, res)=>{
    const categoryObject  = req.body;
    //create a new category
    const newCategory = await Category.create(categoryObject);
    if (newCategory)
        res.status(200).json(newCategory)
    else
        res.status(401).json({ message: 'Cannot add category (Invalid or missing details)' })
}
//====================================================================================================================================
module.exports = { addDish, addCategory }