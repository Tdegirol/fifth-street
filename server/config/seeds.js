const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Bags' },
    { name: 'Prints' },
    { name: 'Clothing' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Watermelon Tote Bag',
      category: categories[0]._id,
      description: 'Watermelon handheld tote bag.',
      price: 15,
      image: 'watermelon-tote.jpg',
      quantity: 10
    },
    {
      name: 'Mountains Print',
      category: categories[1]._id,
      description: 'Mountain landscape in frame 12" x 16".',
      price: 20,
      image: 'mountains-print.jpg',
      quantity: 5
    },
    {
      name: 'Taco Money',
      category: categories[0]._id,
      description: 'Zipper bag for your cash and cards.',
      price: 15,
      image: 'taco-money.jpg',
      quantity: 7
    },
    {
      name: 'Monstera Print',
      category: categories[1]._id,
      description: 'Monstera & cats painting in frame 12" x 16".',
      price: 20,
      image: 'monstera-cats.jpg',
      quantity: 3
    },
    {
      name: 'Shamrock Hat',
      category: categories[2]._id,
      description: 'Hand stitched shamrock hat.',
      price: 25,
      image: 'shamrock-hat.jpg',
      quantity: 5
    },
    {
      name: 'Wine Bags',
      category: categories[0]._id,
      description: 'Wine bags.',
      price: 15,
      image: 'wine-bags.jpg',
      quantity: 10
    },
    {
      name: 'Hot Sauce Bag',
      category: categories[0]._id,
      description: 'Zipper bag for your hot sauce! or moneys or whatever.',
      price: 15,
      image: 'hotsauce-bag.jpg',
      quantity: 10
    },
    {
      name: 'Fifth Street Beanie',
      category: categories[2]._id,
      description: 'Wool beanie fifth street printing Co! One size fits all.',
      price: 25,
      image: 'beanie.jpg',
      quantity: 8
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
