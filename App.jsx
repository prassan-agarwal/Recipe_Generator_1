import React, { useState, useMemo } from 'react';
import { Search, ChefHat, Clock, Users, Star, Heart, Filter, X, Camera, Utensils, Flame } from 'lucide-react';

// Recipe Database (25+ recipes with detailed information)
const RECIPE_DATABASE = [
  {
    id: 1,
    name: "Classic Spaghetti Carbonara",
    cuisine: "Italian",
    ingredients: ["spaghetti", "eggs", "bacon", "parmesan cheese", "black pepper", "salt"],
    instructions: [
      "Cook spaghetti in salted boiling water until al dente",
      "Fry bacon until crispy, reserve the fat",
      "Beat eggs with grated parmesan cheese",
      "Drain pasta, mix with bacon and fat",
      "Remove from heat, quickly stir in egg mixture",
      "Season with black pepper and serve immediately"
    ],
    cookingTime: 20,
    difficulty: "easy",
    servings: 4,
    calories: 450,
    protein: 22,
    dietary: ["gluten"],
    image: "🍝"
  },
  {
    id: 2,
    name: "Vegetable Stir Fry",
    cuisine: "Asian",
    ingredients: ["broccoli", "bell pepper", "carrot", "soy sauce", "garlic", "ginger", "rice", "oil"],
    instructions: [
      "Cook rice according to package instructions",
      "Heat oil in a wok over high heat",
      "Add minced garlic and ginger, stir for 30 seconds",
      "Add chopped vegetables, stir fry for 5 minutes",
      "Add soy sauce and toss to coat",
      "Serve hot over rice"
    ],
    cookingTime: 15,
    difficulty: "easy",
    servings: 2,
    calories: 280,
    protein: 8,
    dietary: ["vegetarian", "vegan"],
    image: "🥦"
  },
  {
    id: 3,
    name: "Chicken Caesar Salad",
    cuisine: "American",
    ingredients: ["chicken breast", "lettuce", "parmesan cheese", "croutons", "caesar dressing", "lemon"],
    instructions: [
      "Season and grill chicken breast until cooked through",
      "Slice chicken into strips",
      "Tear lettuce into bite-sized pieces",
      "Toss lettuce with caesar dressing",
      "Top with chicken, croutons, and parmesan",
      "Squeeze lemon juice over and serve"
    ],
    cookingTime: 25,
    difficulty: "easy",
    servings: 2,
    calories: 380,
    protein: 35,
    dietary: ["gluten"],
    image: "🥗"
  },
  {
    id: 4,
    name: "Margherita Pizza",
    cuisine: "Italian",
    ingredients: ["pizza dough", "tomato sauce", "mozzarella cheese", "basil", "olive oil", "garlic"],
    instructions: [
      "Preheat oven to 475°F (245°C)",
      "Roll out pizza dough into a circle",
      "Spread tomato sauce evenly over dough",
      "Add torn mozzarella cheese",
      "Drizzle with olive oil and add minced garlic",
      "Bake for 12-15 minutes until crust is golden",
      "Top with fresh basil leaves and serve"
    ],
    cookingTime: 30,
    difficulty: "medium",
    servings: 2,
    calories: 520,
    protein: 18,
    dietary: ["vegetarian", "gluten"],
    image: "🍕"
  },
  {
    id: 5,
    name: "Beef Tacos",
    cuisine: "Mexican",
    ingredients: ["ground beef", "taco shells", "lettuce", "tomato", "cheese", "sour cream", "onion", "spices"],
    instructions: [
      "Brown ground beef in a pan",
      "Add taco seasoning and a splash of water",
      "Simmer for 5 minutes",
      "Warm taco shells in oven",
      "Chop lettuce, tomatoes, and onions",
      "Fill shells with beef and toppings",
      "Add cheese and sour cream, serve immediately"
    ],
    cookingTime: 20,
    difficulty: "easy",
    servings: 4,
    calories: 420,
    protein: 24,
    dietary: ["gluten"],
    image: "🌮"
  },
  {
    id: 6,
    name: "Greek Salad",
    cuisine: "Mediterranean",
    ingredients: ["cucumber", "tomato", "feta cheese", "olives", "red onion", "olive oil", "lemon", "oregano"],
    instructions: [
      "Dice cucumbers and tomatoes",
      "Slice red onion thinly",
      "Combine vegetables in a bowl",
      "Add olives and crumbled feta cheese",
      "Drizzle with olive oil and lemon juice",
      "Sprinkle with oregano and toss gently"
    ],
    cookingTime: 10,
    difficulty: "easy",
    servings: 4,
    calories: 180,
    protein: 6,
    dietary: ["vegetarian", "gluten-free"],
    image: "🥗"
  },
  {
    id: 7,
    name: "Chicken Tikka Masala",
    cuisine: "Indian",
    ingredients: ["chicken", "yogurt", "tomato sauce", "cream", "ginger", "garlic", "spices", "rice", "onion"],
    instructions: [
      "Marinate chicken in yogurt and spices for 30 minutes",
      "Grill or pan-fry marinated chicken",
      "Sauté onions, ginger, and garlic",
      "Add tomato sauce and spices, simmer",
      "Add cream and cooked chicken",
      "Simmer for 10 minutes",
      "Serve with rice"
    ],
    cookingTime: 50,
    difficulty: "medium",
    servings: 4,
    calories: 480,
    protein: 32,
    dietary: ["gluten-free"],
    image: "🍛"
  },
  {
    id: 8,
    name: "Quinoa Buddha Bowl",
    cuisine: "Modern",
    ingredients: ["quinoa", "chickpeas", "avocado", "spinach", "carrot", "tahini", "lemon", "olive oil"],
    instructions: [
      "Cook quinoa according to package directions",
      "Roast chickpeas with olive oil and spices",
      "Spiralize or julienne carrots",
      "Massage spinach with lemon juice",
      "Slice avocado",
      "Arrange all ingredients in a bowl",
      "Drizzle with tahini dressing"
    ],
    cookingTime: 25,
    difficulty: "easy",
    servings: 2,
    calories: 420,
    protein: 14,
    dietary: ["vegetarian", "vegan", "gluten-free"],
    image: "🥙"
  },
  {
    id: 9,
    name: "Salmon Teriyaki",
    cuisine: "Japanese",
    ingredients: ["salmon", "soy sauce", "honey", "ginger", "garlic", "rice", "sesame seeds", "green onion"],
    instructions: [
      "Mix soy sauce, honey, ginger, and garlic for marinade",
      "Marinate salmon for 15 minutes",
      "Cook rice",
      "Pan-sear salmon skin-side down first",
      "Flip and cook until done",
      "Brush with remaining marinade",
      "Garnish with sesame seeds and green onions"
    ],
    cookingTime: 30,
    difficulty: "medium",
    servings: 2,
    calories: 440,
    protein: 38,
    dietary: ["gluten-free"],
    image: "🐟"
  },
  {
    id: 10,
    name: "Mushroom Risotto",
    cuisine: "Italian",
    ingredients: ["arborio rice", "mushrooms", "parmesan cheese", "white wine", "butter", "onion", "garlic", "vegetable broth"],
    instructions: [
      "Sauté onion and garlic in butter",
      "Add arborio rice, toast for 2 minutes",
      "Add white wine, stir until absorbed",
      "Add warm broth one ladle at a time, stirring constantly",
      "Sauté mushrooms separately",
      "Add mushrooms and parmesan to rice",
      "Stir until creamy, serve immediately"
    ],
    cookingTime: 35,
    difficulty: "hard",
    servings: 4,
    calories: 380,
    protein: 12,
    dietary: ["vegetarian", "gluten-free"],
    image: "🍚"
  },
  {
    id: 11,
    name: "Caprese Sandwich",
    cuisine: "Italian",
    ingredients: ["bread", "mozzarella cheese", "tomato", "basil", "olive oil", "balsamic vinegar", "salt"],
    instructions: [
      "Slice bread, tomatoes, and mozzarella",
      "Drizzle bread with olive oil",
      "Layer mozzarella and tomato slices",
      "Add fresh basil leaves",
      "Drizzle with balsamic vinegar",
      "Season with salt and pepper",
      "Close sandwich and serve"
    ],
    cookingTime: 10,
    difficulty: "easy",
    servings: 2,
    calories: 320,
    protein: 14,
    dietary: ["vegetarian", "gluten"],
    image: "🥪"
  },
  {
    id: 12,
    name: "Pad Thai",
    cuisine: "Thai",
    ingredients: ["rice noodles", "shrimp", "eggs", "peanuts", "bean sprouts", "lime", "fish sauce", "garlic", "sugar"],
    instructions: [
      "Soak rice noodles in warm water",
      "Heat oil in wok, scramble eggs",
      "Add shrimp and garlic, cook until pink",
      "Add drained noodles",
      "Add fish sauce, sugar, and tamarind",
      "Toss in bean sprouts and peanuts",
      "Serve with lime wedges"
    ],
    cookingTime: 25,
    difficulty: "medium",
    servings: 2,
    calories: 480,
    protein: 28,
    dietary: ["gluten-free"],
    image: "🍜"
  },
  {
    id: 13,
    name: "Vegetarian Chili",
    cuisine: "American",
    ingredients: ["beans", "tomato", "bell pepper", "onion", "corn", "chili powder", "cumin", "garlic"],
    instructions: [
      "Sauté diced onion and bell pepper",
      "Add minced garlic and spices",
      "Add canned tomatoes and beans",
      "Add corn kernels",
      "Simmer for 30 minutes",
      "Adjust seasoning to taste",
      "Serve with toppings of choice"
    ],
    cookingTime: 45,
    difficulty: "easy",
    servings: 6,
    calories: 280,
    protein: 12,
    dietary: ["vegetarian", "vegan", "gluten-free"],
    image: "🍲"
  },
  {
    id: 14,
    name: "Chicken Fried Rice",
    cuisine: "Chinese",
    ingredients: ["rice", "chicken", "eggs", "peas", "carrot", "soy sauce", "green onion", "garlic", "oil"],
    instructions: [
      "Use day-old cold rice for best results",
      "Scramble eggs in wok, set aside",
      "Cook diced chicken until done",
      "Add diced carrots and peas",
      "Add rice, breaking up clumps",
      "Add soy sauce and stir fry",
      "Mix in eggs and green onions"
    ],
    cookingTime: 20,
    difficulty: "easy",
    servings: 4,
    calories: 380,
    protein: 24,
    dietary: ["gluten"],
    image: "🍚"
  },
  {
    id: 15,
    name: "Avocado Toast",
    cuisine: "Modern",
    ingredients: ["bread", "avocado", "eggs", "lemon", "red pepper flakes", "salt", "olive oil"],
    instructions: [
      "Toast bread until golden",
      "Mash avocado with lemon juice and salt",
      "Spread avocado on toast",
      "Fry or poach eggs",
      "Place egg on top of avocado",
      "Sprinkle with red pepper flakes",
      "Drizzle with olive oil"
    ],
    cookingTime: 10,
    difficulty: "easy",
    servings: 2,
    calories: 320,
    protein: 14,
    dietary: ["vegetarian", "gluten"],
    image: "🥑"
  },
  {
    id: 16,
    name: "Beef Stir Fry",
    cuisine: "Asian",
    ingredients: ["beef", "broccoli", "soy sauce", "ginger", "garlic", "rice", "sesame oil", "cornstarch"],
    instructions: [
      "Slice beef thinly against the grain",
      "Marinate beef in soy sauce and cornstarch",
      "Cook rice",
      "Stir fry beef in hot wok until browned",
      "Add broccoli and stir fry",
      "Add ginger, garlic, and sauce",
      "Serve over rice with sesame oil"
    ],
    cookingTime: 25,
    difficulty: "medium",
    servings: 4,
    calories: 420,
    protein: 32,
    dietary: ["gluten"],
    image: "🥩"
  },
  {
    id: 17,
    name: "Lentil Soup",
    cuisine: "Mediterranean",
    ingredients: ["lentils", "carrot", "celery", "onion", "tomato", "garlic", "vegetable broth", "cumin", "spinach"],
    instructions: [
      "Sauté diced onion, carrot, and celery",
      "Add minced garlic and cumin",
      "Add lentils and vegetable broth",
      "Bring to boil, then simmer for 25 minutes",
      "Add diced tomatoes",
      "Stir in fresh spinach until wilted",
      "Season and serve hot"
    ],
    cookingTime: 40,
    difficulty: "easy",
    servings: 6,
    calories: 240,
    protein: 14,
    dietary: ["vegetarian", "vegan", "gluten-free"],
    image: "🍲"
  },
  {
    id: 18,
    name: "Shrimp Scampi",
    cuisine: "Italian",
    ingredients: ["shrimp", "pasta", "butter", "garlic", "white wine", "lemon", "parsley", "red pepper flakes"],
    instructions: [
      "Cook pasta until al dente",
      "Sauté garlic in butter",
      "Add shrimp and cook until pink",
      "Add white wine and lemon juice",
      "Simmer for 2 minutes",
      "Toss with cooked pasta",
      "Garnish with parsley and pepper flakes"
    ],
    cookingTime: 20,
    difficulty: "medium",
    servings: 4,
    calories: 440,
    protein: 28,
    dietary: ["gluten"],
    image: "🍤"
  },
  {
    id: 19,
    name: "Veggie Burgers",
    cuisine: "American",
    ingredients: ["black beans", "breadcrumbs", "onion", "garlic", "cumin", "burger buns", "lettuce", "tomato", "cheese"],
    instructions: [
      "Mash black beans in a bowl",
      "Sauté diced onion and garlic",
      "Mix beans with breadcrumbs, onion, and spices",
      "Form into patties",
      "Pan fry or grill patties until crispy",
      "Toast burger buns",
      "Assemble with lettuce, tomato, and cheese"
    ],
    cookingTime: 25,
    difficulty: "medium",
    servings: 4,
    calories: 380,
    protein: 16,
    dietary: ["vegetarian", "gluten"],
    image: "🍔"
  },
  {
    id: 20,
    name: "Chicken Noodle Soup",
    cuisine: "American",
    ingredients: ["chicken", "noodles", "carrot", "celery", "onion", "garlic", "chicken broth", "thyme", "bay leaf"],
    instructions: [
      "Sauté diced onion, carrot, and celery",
      "Add minced garlic and cook briefly",
      "Add chicken broth and herbs",
      "Add chicken pieces and simmer",
      "Remove chicken, shred, and return to pot",
      "Add noodles and cook until tender",
      "Season to taste and serve hot"
    ],
    cookingTime: 35,
    difficulty: "easy",
    servings: 6,
    calories: 280,
    protein: 24,
    dietary: ["gluten"],
    image: "🍜"
  },
  {
    id: 21,
    name: "Eggplant Parmesan",
    cuisine: "Italian",
    ingredients: ["eggplant", "tomato sauce", "mozzarella cheese", "parmesan cheese", "breadcrumbs", "eggs", "basil"],
    instructions: [
      "Slice eggplant and salt to remove moisture",
      "Dip in beaten eggs, then breadcrumbs",
      "Fry until golden brown",
      "Layer in baking dish with tomato sauce",
      "Top with mozzarella and parmesan",
      "Bake at 375°F for 25 minutes",
      "Garnish with fresh basil"
    ],
    cookingTime: 50,
    difficulty: "medium",
    servings: 4,
    calories: 420,
    protein: 18,
    dietary: ["vegetarian", "gluten"],
    image: "🍆"
  },
  {
    id: 22,
    name: "Fajitas",
    cuisine: "Mexican",
    ingredients: ["chicken", "bell pepper", "onion", "tortillas", "lime", "cumin", "paprika", "sour cream", "cheese"],
    instructions: [
      "Slice chicken, peppers, and onions",
      "Season chicken with cumin and paprika",
      "Cook chicken in hot pan until done",
      "Add peppers and onions, sauté",
      "Warm tortillas",
      "Squeeze lime juice over chicken mixture",
      "Serve with tortillas and toppings"
    ],
    cookingTime: 25,
    difficulty: "easy",
    servings: 4,
    calories: 400,
    protein: 30,
    dietary: ["gluten"],
    image: "🌮"
  },
  {
    id: 23,
    name: "Tomato Basil Pasta",
    cuisine: "Italian",
    ingredients: ["pasta", "tomato", "basil", "garlic", "olive oil", "parmesan cheese", "salt", "red pepper flakes"],
    instructions: [
      "Cook pasta until al dente",
      "Sauté minced garlic in olive oil",
      "Add diced fresh tomatoes",
      "Simmer for 10 minutes",
      "Toss with cooked pasta",
      "Add torn fresh basil",
      "Top with parmesan and pepper flakes"
    ],
    cookingTime: 20,
    difficulty: "easy",
    servings: 4,
    calories: 360,
    protein: 12,
    dietary: ["vegetarian", "gluten"],
    image: "🍝"
  },
  {
    id: 24,
    name: "Sweet and Sour Chicken",
    cuisine: "Chinese",
    ingredients: ["chicken", "bell pepper", "pineapple", "onion", "soy sauce", "vinegar", "sugar", "rice", "cornstarch"],
    instructions: [
      "Cut chicken into bite-sized pieces",
      "Coat in cornstarch and fry until crispy",
      "Sauté peppers and onions",
      "Mix soy sauce, vinegar, and sugar for sauce",
      "Add pineapple chunks",
      "Toss chicken with vegetables and sauce",
      "Serve over rice"
    ],
    cookingTime: 30,
    difficulty: "medium",
    servings: 4,
    calories: 460,
    protein: 28,
    dietary: ["gluten"],
    image: "🍗"
  },
  {
    id: 25,
    name: "Gazpacho",
    cuisine: "Spanish",
    ingredients: ["tomato", "cucumber", "bell pepper", "onion", "garlic", "olive oil", "vinegar", "bread"],
    instructions: [
      "Roughly chop all vegetables",
      "Soak bread in water, squeeze out excess",
      "Blend tomatoes, cucumber, pepper, and onion",
      "Add garlic, oil, and vinegar",
      "Blend until smooth or slightly chunky",
      "Chill for at least 2 hours",
      "Serve cold with garnishes"
    ],
    cookingTime: 15,
    difficulty: "easy",
    servings: 4,
    calories: 160,
    protein: 4,
    dietary: ["vegetarian", "vegan", "gluten"],
    image: "🥣"
  }
];

// Common ingredient substitutions
const SUBSTITUTIONS = {
  "eggs": ["flax eggs", "chia eggs", "applesauce", "banana"],
  "butter": ["olive oil", "coconut oil", "margarine", "avocado"],
  "milk": ["almond milk", "soy milk", "oat milk", "coconut milk"],
  "flour": ["almond flour", "coconut flour", "rice flour", "oat flour"],
  "sugar": ["honey", "maple syrup", "stevia", "agave nectar"],
  "cream": ["coconut cream", "cashew cream", "greek yogurt"],
  "cheese": ["nutritional yeast", "cashew cheese", "tofu"],
  "chicken": ["tofu", "tempeh", "chickpeas", "mushrooms"],
  "beef": ["lentils", "black beans", "mushrooms", "beyond meat"],
  "pasta": ["zucchini noodles", "rice noodles", "quinoa pasta"]
};

const RecipeGenerator = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dietaryPrefs, setDietaryPrefs] = useState([]);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    maxTime: 60,
    minProtein: 0
  });
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});
  const [servingSizes, setServingSizes] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [view, setView] = useState('search'); // 'search', 'favorites', 'suggestions'

  // Common ingredients for quick selection
  const commonIngredients = [
    "chicken", "beef", "pork", "shrimp", "salmon", "eggs", "tofu",
    "rice", "pasta", "bread", "quinoa", "noodles",
    "tomato", "onion", "garlic", "bell pepper", "broccoli", "carrot", "spinach",
    "cheese", "butter", "milk", "cream", "yogurt",
    "soy sauce", "olive oil", "lemon", "basil", "oregano"
  ];

  const addIngredient = (ingredient) => {
    const normalized = ingredient.toLowerCase().trim();
    if (normalized && !selectedIngredients.includes(normalized)) {
      setSelectedIngredients([...selectedIngredients, normalized]);
      setInputValue('');
    }
  };

  const removeIngredient = (ingredient) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
  };

  const toggleDietary = (pref) => {
    setDietaryPrefs(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const toggleFavorite = (recipeId) => {
    setFavorites(prev => 
      prev.includes(recipeId) ? prev.filter(id => id !== recipeId) : [...prev, recipeId]
    );
  };

  const rateRecipe = (recipeId, rating) => {
    setRatings(prev => ({ ...prev, [recipeId]: rating }));
  };

  const adjustServings = (recipeId, servings) => {
    setServingSizes(prev => ({ ...prev, [recipeId]: servings }));
  };

  // Recipe matching algorithm
  const matchedRecipes = useMemo(() => {
    let recipes = RECIPE_DATABASE.filter(recipe => {
      // Dietary preferences filter
      if (dietaryPrefs.includes('vegetarian') && !recipe.dietary.includes('vegetarian')) {
        return false;
      }
      if (dietaryPrefs.includes('vegan') && !recipe.dietary.includes('vegan')) {
        return false;
      }
      if (dietaryPrefs.includes('gluten-free') && recipe.dietary.includes('gluten')) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty !== 'all' && recipe.difficulty !== filters.difficulty) {
        return false;
      }

      // Time filter
      if (recipe.cookingTime > filters.maxTime) {
        return false;
      }

      // Protein filter
      if (recipe.protein < filters.minProtein) {
        return false;
      }

      // Ingredient matching
      if (selectedIngredients.length === 0) return true;
      
      const matchCount = selectedIngredients.filter(ing => 
        recipe.ingredients.some(recipeIng => 
          recipeIng.toLowerCase().includes(ing) || ing.includes(recipeIng.toLowerCase())
        )
      ).length;

      return matchCount > 0;
    });

    // Sort by ingredient match percentage
    if (selectedIngredients.length > 0) {
      recipes = recipes.map(recipe => {
        const matchCount = selectedIngredients.filter(ing => 
          recipe.ingredients.some(recipeIng => 
            recipeIng.toLowerCase().includes(ing) || ing.includes(recipeIng.toLowerCase())
          )
        ).length;
        const matchPercentage = (matchCount / selectedIngredients.length) * 100;
        return { ...recipe, matchPercentage };
      }).sort((a, b) => b.matchPercentage - a.matchPercentage);
    }

    return recipes;
  }, [selectedIngredients, dietaryPrefs, filters]);

  // Recipe suggestions based on ratings and preferences
  const suggestedRecipes = useMemo(() => {
    const ratedRecipes = Object.entries(ratings).filter(([_, rating]) => rating >= 4);
    if (ratedRecipes.length === 0) return [];

    const highRatedRecipes = ratedRecipes.map(([id, _]) => 
      RECIPE_DATABASE.find(r => r.id === parseInt(id))
    );

    const cuisines = [...new Set(highRatedRecipes.map(r => r.cuisine))];
    const ingredients = [...new Set(highRatedRecipes.flatMap(r => r.ingredients))];

    return RECIPE_DATABASE.filter(recipe => 
      !ratedRecipes.some(([id, _]) => parseInt(id) === recipe.id) &&
      (cuisines.includes(recipe.cuisine) || 
       recipe.ingredients.some(ing => ingredients.includes(ing)))
    ).slice(0, 6);
  }, [ratings]);

  const getMissingIngredients = (recipe) => {
    return recipe.ingredients.filter(ing => 
      !selectedIngredients.some(selected => 
        ing.toLowerCase().includes(selected) || selected.includes(ing.toLowerCase())
      )
    );
  };

  const getSubstitutions = (ingredient) => {
    return SUBSTITUTIONS[ingredient.toLowerCase()] || [];
  };

  const RecipeCard = ({ recipe, showMatch = false }) => {
    const isFavorite = favorites.includes(recipe.id);
    const userRating = ratings[recipe.id] || 0;
    const customServings = servingSizes[recipe.id] || recipe.servings;
    const servingMultiplier = customServings / recipe.servings;
    const missingIngredients = getMissingIngredients(recipe);

    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-4xl mb-2">{recipe.image}</div>
            <h3 className="font-bold text-lg text-gray-800">{recipe.name}</h3>
            <p className="text-sm text-gray-500">{recipe.cuisine} Cuisine</p>
          </div>
          <button
            onClick={() => toggleFavorite(recipe.id)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Heart 
              className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </button>
        </div>

        {showMatch && recipe.matchPercentage && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Ingredient Match</span>
              <span className="font-semibold text-green-600">
                {Math.round(recipe.matchPercentage)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${recipe.matchPercentage}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
            <Clock className="w-3 h-3 mr-1" />
            {recipe.cookingTime} min
          </span>
          <span className="flex items-center text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
            <Utensils className="w-3 h-3 mr-1" />
            {recipe.difficulty}
          </span>
          <span className="flex items-center text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">
            <Flame className="w-3 h-3 mr-1" />
            {Math.round(recipe.calories * servingMultiplier)} cal
          </span>
          <span className="flex items-center text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
            <Users className="w-3 h-3 mr-1" />
            {customServings} servings
          </span>
        </div>

        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => rateRecipe(recipe.id, star)}
              className="focus:outline-none"
            >
              <Star 
                className={`w-4 h-4 ${star <= userRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            </button>
          ))}
          {userRating > 0 && (
            <span className="text-xs text-gray-600 ml-1">({userRating}/5)</span>
          )}
        </div>

        {missingIngredients.length > 0 && selectedIngredients.length > 0 && (
          <div className="mb-3 p-2 bg-yellow-50 rounded text-xs">
            <p className="font-semibold text-yellow-800 mb-1">Missing ingredients:</p>
            <p className="text-yellow-700">{missingIngredients.join(', ')}</p>
          </div>
        )}

        <button
          onClick={() => setSelectedRecipe(recipe)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          View Recipe
        </button>
      </div>
    );
  };

  const RecipeModal = ({ recipe, onClose }) => {
    if (!recipe) return null;

    const customServings = servingSizes[recipe.id] || recipe.servings;
    const servingMultiplier = customServings / recipe.servings;
    const missingIngredients = getMissingIngredients(recipe);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{recipe.image}</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{recipe.name}</h2>
                <p className="text-gray-500">{recipe.cuisine} Cuisine</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Cooking Time</p>
                  <p className="font-semibold text-gray-800">{recipe.cookingTime} min</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg">
                <Utensils className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">Difficulty</p>
                  <p className="font-semibold text-gray-800 capitalize">{recipe.difficulty}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg">
                <Flame className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-600">Calories</p>
                  <p className="font-semibold text-gray-800">{Math.round(recipe.calories * servingMultiplier)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Protein</p>
                  <p className="font-semibold text-gray-800">{Math.round(recipe.protein * servingMultiplier)}g</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Adjust Servings
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => adjustServings(recipe.id, Math.max(1, customServings - 1))}
                  className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                >
                  -
                </button>
                <span className="font-semibold text-lg">{customServings} servings</span>
                <button
                  onClick={() => adjustServings(recipe.id, customServings + 1)}
                  className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, idx) => {
                  const isMissing = missingIngredients.includes(ingredient);
                  const substitutions = getSubstitutions(ingredient);
                  return (
                    <li key={idx}>
                      <div className="flex items-start gap-2">
                        <span className={`flex-1 ${isMissing ? 'text-orange-600 font-medium' : 'text-gray-700'}`}>
                          • {ingredient}
                          {isMissing && ' (missing)'}
                        </span>
                      </div>
                      {isMissing && substitutions.length > 0 && (
                        <div className="ml-4 mt-1 text-xs text-gray-600">
                          <span className="font-semibold">Substitutes:</span> {substitutions.join(', ')}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Instructions</h3>
              <ol className="space-y-3">
                {recipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700 pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Dietary Information</h4>
              <div className="flex flex-wrap gap-2">
                {recipe.dietary.map((diet, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border">
                    {diet === 'gluten' ? 'Contains Gluten' : diet.charAt(0).toUpperCase() + diet.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ChefHat className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Smart Recipe Generator</h1>
          </div>
          <p className="text-gray-600">Discover delicious recipes based on your ingredients and preferences</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setView('search')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              view === 'search' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Search Recipes
          </button>
          <button
            onClick={() => setView('favorites')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              view === 'favorites' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Heart className="w-4 h-4" />
            Favorites ({favorites.length})
          </button>
          <button
            onClick={() => setView('suggestions')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              view === 'suggestions' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Suggestions
          </button>
        </div>

        {view === 'search' && (
          <>
            {/* Ingredient Input */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Available Ingredients</h2>
              <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addIngredient(inputValue)}
                    placeholder="Type an ingredient and press Enter..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => addIngredient(inputValue)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Add
                </button>
              </div>

              {selectedIngredients.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Selected Ingredients:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedIngredients.map((ingredient, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {ingredient}
                        <button
                          onClick={() => removeIngredient(ingredient)}
                          className="hover:bg-blue-200 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Quick Add:</p>
                <div className="flex flex-wrap gap-2">
                  {commonIngredients
                    .filter(ing => !selectedIngredients.includes(ing))
                    .slice(0, 15)
                    .map((ingredient, idx) => (
                      <button
                        key={idx}
                        onClick={() => addIngredient(ingredient)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        + {ingredient}
                      </button>
                    ))}
                </div>
              </div>
            </div>

            {/* Dietary Preferences */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Dietary Preferences</h2>
              <div className="flex flex-wrap gap-3">
                {['vegetarian', 'vegan', 'gluten-free'].map((pref) => (
                  <button
                    key={pref}
                    onClick={() => toggleDietary(pref)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      dietaryPrefs.includes(pref)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {pref.charAt(0).toUpperCase() + pref.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-lg font-bold text-gray-800 w-full"
              >
                <Filter className="w-5 h-5" />
                Filters
                <span className="ml-auto text-sm text-gray-500">
                  {showFilters ? '▲' : '▼'}
                </span>
              </button>

              {showFilters && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={filters.difficulty}
                      onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Levels</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Max Cooking Time: {filters.maxTime} minutes
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="120"
                      step="5"
                      value={filters.maxTime}
                      onChange={(e) => setFilters({...filters, maxTime: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Minimum Protein: {filters.minProtein}g
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      step="2"
                      value={filters.minProtein}
                      onChange={(e) => setFilters({...filters, minProtein: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Recipe Results */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {matchedRecipes.length} Recipe{matchedRecipes.length !== 1 ? 's' : ''} Found
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchedRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} showMatch={selectedIngredients.length > 0} />
                ))}
              </div>
              {matchedRecipes.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No recipes found. Try adjusting your filters or ingredients.</p>
                </div>
              )}
            </div>
          </>
        )}

        {view === 'favorites' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Favorite Recipes</h2>
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map(id => {
                  const recipe = RECIPE_DATABASE.find(r => r.id === id);
                  return recipe && <RecipeCard key={recipe.id} recipe={recipe} />;
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No favorites yet. Start exploring recipes and save your favorites!</p>
              </div>
            )}
          </div>
        )}

        {view === 'suggestions' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended For You</h2>
            {suggestedRecipes.length > 0 ? (
              <>
                <p className="text-gray-600 mb-6">Based on your ratings and preferences</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggestedRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Rate some recipes to get personalized suggestions!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  );
};

export default RecipeGenerator;