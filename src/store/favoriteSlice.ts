import { StateCreator} from 'zustand'
import { Recipe } from '../types'
import { RecipesSliceType, createRecipesSlice } from './recipeSlice'
import { NotificationSliceType, createNotificationSlice } from './notificationSlice'

export type FavoritesSliceType = {
  favorites: Recipe[]
  handleClickFavorites: (recipe: Recipe) => void
  favoriteExists: (id : Recipe['idDrink']) => boolean
  loadFromStorage: () => void	
}

export const createFavoritesSlice : StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType,[['zustand/devtools', never]],[],FavoritesSliceType> = (set,get,api) => ({
  favorites:[],
  handleClickFavorites: (recipe) => {
    if(get().favoriteExists(recipe.idDrink)){
	 set(state => ({
	  favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)	
	 }),
	 undefined,
	 'favorites/deletefavorites'
	)
    createNotificationSlice(set,get,api).showNotification({
		text:'Se eliminó de favoritos',
		error:false
    })
	} else {
	 set(state => ({
	  favorites: [...state.favorites,recipe]
	 }),
	  undefined,
	  'favorites/addFavorites'
	)
	 createNotificationSlice(set,get,api).showNotification({
		text:'Se agregó a favorito',
		error:false
    })
	}
	//Consumir Estado de otra slice
	createRecipesSlice(set,get,api).closeModal()
	localStorage.setItem('favorites',JSON.stringify(get().favorites))
  },
  favoriteExists : (id) => {
   return get().favorites.some(favorite => favorite.idDrink === id)
  },
  loadFromStorage: () => {
	const storedFavorites = localStorage.getItem('favorites')

	if(storedFavorites){
	  set(
	   {favorites: JSON.parse(storedFavorites)},
	   undefined,
	   'storage/loadFromStorage'
	 )
	}
  }	
})
