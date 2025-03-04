import React from 'react';
import RecipeCard from '../components/RecipeCard';
import styles from '../styles/Home.module.css';

const Home = () => {
  // Hardcoded recipe data
  const featuredRecipes = [
    {
      id: 1,
      title: 'Pasta Carbonara',
      description: 'Creamy Italian pasta dish with eggs, cheese, and bacon.',
      image: '/images/pasta.jpg',
      likes: 12,
      comments: 5,
      ingredients: 'Spaghetti, Eggs, Parmesan Cheese, Bacon, Garlic, Black Pepper, Salt',
      instructions: '1. Cook spaghetti. 2. Fry bacon. 3. Mix eggs and cheese. 4. Combine everything.',
      commentsList: ['Great recipe!', 'Loved it!'],
    },
    {
      id: 2,
      title: 'Chicken Tikka Masala',
      description: 'Spicy and creamy Indian chicken curry.',
      image: '/images/chicken-tikka.jpg',
      likes: 8,
      comments: 3,
      ingredients: 'Chicken, Yogurt, Tomatoes, Cream, Spices, Garlic, Ginger',
      instructions: '1. Marinate chicken. 2. Cook in a pan. 3. Add tomato sauce and cream. 4. Simmer and serve.',
      commentsList: ['Delicious!', 'Will make it again.'],
    },
    {
      id: 3,
      title: 'Chocolate Cake',
      description: 'Rich and decadent chocolate cake.',
      image: '/images/chocolate-cake.jpg',
      likes: 15,
      comments: 7,
      ingredients: 'Flour, Sugar, Cocoa Powder, Eggs, Butter, Milk, Baking Powder',
      instructions: '1. Mix dry ingredients. 2. Add wet ingredients. 3. Bake at 350°F for 30 minutes. 4. Frost and serve.',
      commentsList: ['Best chocolate cake ever!', 'Perfect for birthdays.'],
    },
    {
      id: 4,
      title: 'Vegetable Stir Fry',
      description: 'Healthy and colorful vegetable stir fry.',
      image: '/images/stir-fry.jpg',
      likes: 6,
      comments: 2,
      ingredients: 'Broccoli, Carrots, Bell Peppers, Soy Sauce, Garlic, Ginger, Sesame Oil',
      instructions: '1. Chop vegetables. 2. Stir fry in sesame oil. 3. Add soy sauce and spices. 4. Serve hot.',
      commentsList: ['Quick and easy!', 'Great for a light meal.'],
    },
    {
      id: 5,
      title: 'Beef Burger',
      description: 'Juicy beef burger with fresh toppings.',
      image: '/images/burger.jpg',
      likes: 10,
      comments: 4,
      ingredients: 'Beef Patty, Burger Buns, Lettuce, Tomato, Cheese, Onion, Pickles',
      instructions: '1. Grill the beef patty. 2. Toast the buns. 3. Assemble with toppings. 4. Serve with fries.',
      commentsList: ['Classic and delicious!', 'Perfect for BBQ nights.'],
    },
    {
      id: 6,
      title: 'Margherita Pizza',
      description: 'Classic Italian pizza with tomato and mozzarella.',
      image: '/images/pizza.jpg',
      likes: 20,
      comments: 10,
      ingredients: 'Pizza Dough, Tomato Sauce, Mozzarella Cheese, Basil, Olive Oil',
      instructions: '1. Roll out the dough. 2. Spread tomato sauce. 3. Add cheese and basil. 4. Bake at 475°F for 12 minutes.',
      commentsList: ['Authentic and tasty!', 'A family favorite.'],
    },
    {
      id: 7,
      title: 'Sushi Rolls',
      description: 'Fresh and delicious sushi rolls.',
      image: '/images/sushi.jpg',
      likes: 14,
      comments: 6,
      ingredients: 'Sushi Rice, Nori, Fish, Vegetables, Rice Vinegar, Soy Sauce',
      instructions: '1. Prepare sushi rice. 2. Lay out nori and rice. 3. Add fillings and roll. 4. Slice and serve.',
      commentsList: ['So fresh!', 'Perfect for sushi lovers.'],
    },
    {
      id: 8,
      title: 'Caesar Salad',
      description: 'Crispy romaine lettuce with Caesar dressing.',
      image: '/images/salad.jpg',
      likes: 7,
      comments: 3,
      ingredients: 'Romaine Lettuce, Croutons, Parmesan Cheese, Caesar Dressing, Chicken (optional)',
      instructions: '1. Chop lettuce. 2. Add croutons and cheese. 3. Toss with dressing. 4. Serve chilled.',
      commentsList: ['Refreshing and tasty!', 'Great as a side dish.'],
    },
    {
      id: 9,
      title: 'Pancakes',
      description: 'Fluffy pancakes with maple syrup.',
      image: '/images/pancakes.webp',
      likes: 18,
      comments: 9,
      ingredients: 'Flour, Milk, Eggs, Sugar, Baking Powder, Butter, Maple Syrup',
      instructions: '1. Mix dry ingredients. 2. Add wet ingredients. 3. Cook on a griddle. 4. Serve with syrup.',
      commentsList: ['Perfect for breakfast!', 'Kids love them.'],
    },
    {
      id: 10,
      title: 'Tiramisu',
      description: 'Classic Italian dessert with coffee and mascarpone.',
      image: '/images/tiramisu.jpg',
      likes: 22,
      comments: 12,
      ingredients: 'Ladyfingers, Coffee, Mascarpone Cheese, Eggs, Sugar, Cocoa Powder',
      instructions: '1. Dip ladyfingers in coffee. 2. Layer with mascarpone mixture. 3. Dust with cocoa. 4. Chill and serve.',
      commentsList: ['Heavenly dessert!', 'Perfect for special occasions.'],
    },
    {
      id: 11,
      title: 'Grilled Salmon',
      description: 'Perfectly grilled salmon with herbs.',
      image: '/images/salmon.jpg',
      likes: 9,
      comments: 4,
      ingredients: 'Salmon Fillet, Olive Oil, Lemon, Garlic, Herbs, Salt, Pepper',
      instructions: '1. Season salmon. 2. Grill for 5-7 minutes per side. 3. Squeeze lemon juice. 4. Serve hot.',
      commentsList: ['Healthy and delicious!', 'Great for dinner.'],
    },
    {
      id: 12,
      title: 'Vegetable Soup',
      description: 'Warm and comforting vegetable soup.',
      image: '/images/soup.jpg',
      likes: 5,
      comments: 1,
      ingredients: 'Carrots, Celery, Onion, Potatoes, Tomatoes, Broth, Herbs',
      instructions: '1. Chop vegetables. 2. Simmer in broth. 3. Add herbs. 4. Serve hot.',
      commentsList: ['Comfort in a bowl!', 'Perfect for cold days.'],
    },
  ];

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <h1>Featured Recipes</h1>
        <div className={styles.recipeGrid}>
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;