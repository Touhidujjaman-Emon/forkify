import 'regenerator-runtime/runtime';
import { API_URL } from './config';
import { getJSON } from './helper';


export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(` ${API_URL}/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}(${res.status})`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      cookingTime: recipe.cooking_time,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      image: recipe.image_url,
      sourceUrl: recipe.source_url,
    };
    console.log(state.recipe);
  } catch (err) {}
};
