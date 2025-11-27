import { StateCreator } from "zustand"
import { getCategories,getRecipeById,getRecipes } from "../services/RecipeService"
import type { Categories,Drink,Drinks,Recipe,SearchFilter } from "../types"
import { FavoritesSliceType } from "./favoriteSlice"

export type RecipesSliceType = {
	categories : Categories
  drinks: Drinks
  selectedRecipe: Recipe
  modal: boolean 
	fetchCategories: () => Promise<void>
  searchRecipes: (searchFilters : SearchFilter) => Promise<void>
  selectRecipe : (id: Drink['idDrink']) => Promise<void>
  closeModal : () => void
}
//[],[] no ese esperan parametro adicionales
export const createRecipesSlice : StateCreator<RecipesSliceType & FavoritesSliceType,[['zustand/devtools', never]],[],RecipesSliceType> = (set) => ({ 
  categories:{
    drinks:[]
  },
  drinks:{ 
    drinks: []
  },
  selectedRecipe: {} as Recipe,
  modal:false,
  fetchCategories: async () => {
    const categories = await getCategories();
    set(
      () => ({ categories }),
      undefined,
      'categories/fetchCategories',
    );
  },
  searchRecipes: async (filters) => {
    const drinks = await getRecipes(filters)
    set(
       { drinks },
       undefined,
       'recipes/searchRecipes'
      );
  },
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeById(id)
    set({
      selectedRecipe,
      modal: true
    },
    undefined,
    'recipe/selectRecipe'
  )
  },
  closeModal : () => {
    set({ 
      modal:false,
      selectedRecipe: {} as Recipe
    },
    undefined,
    'modal/closeModal'  
    )
  },  
}) 