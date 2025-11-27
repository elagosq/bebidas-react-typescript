import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { RecipesSliceType, createRecipesSlice } from './recipeSlice'
import {FavoritesSliceType,createFavoritesSlice} from './favoriteSlice'
import {NotificationSliceType,createNotificationSlice} from './notificationSlice'
import { AISlice, createAISlice } from './aiSlice'

//Múltiples Stores en Zustand con Slices Pattern
export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType & AISlice>()(devtools((...a) => ({
   ...createRecipesSlice(...a),
   ...createFavoritesSlice(...a),
   ...createNotificationSlice(...a),
   ...createAISlice(...a)
})))