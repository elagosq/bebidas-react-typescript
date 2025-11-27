import { StateCreator} from 'zustand'
import { FavoritesSliceType } from './favoriteSlice'

type Notification = {
  text: string
  error : boolean
  show : boolean	
}

export type NotificationSliceType = {
  notification: Notification
  showNotification: (payload : Pick<Notification, 'text' | 'error'>) => void
  hideNotification: () => void	
}


export const createNotificationSlice : StateCreator<NotificationSliceType & FavoritesSliceType,[['zustand/devtools', never]],[],NotificationSliceType> = (set,get) => ({
  notification: {
	text : '',
	error: false,
	show : false
  },
  showNotification : (payload) => {
    set({
		notification : {
		  text: payload.text,
		  error : payload.error,
		  show: true	
		}
	},
    undefined,
	'notification/addNotification' 
   )
	setTimeout(() => 
	  get().hideNotification()
	, 5000)
  },
  hideNotification: () => {
    set({
	  notification:{
		text : '',
		error: false,
		show : false
	  }	
	},
    undefined,
	'notification/hideNotification' 
   )
  }
})
