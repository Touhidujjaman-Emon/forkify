import 'regenerator-runtime/runtime';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
    try {
        const res = await fetch(
            ` https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
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
    } catch (err) {
        
    }
};
