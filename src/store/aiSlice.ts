import { StateCreator } from "zustand";
import AiService from "../services/AiService";

export type AISlice = {
  recipe : string
  isGenerating: boolean
  generateRecipe : (prompt: string) => Promise<void> 	
}

export const createAISlice : StateCreator<AISlice,[['zustand/devtools', never]]> = (set) => ({
  recipe : '',
  isGenerating: false,
  generateRecipe: async (prompt) => {
   set(
    {recipe: '',isGenerating: true},
    undefined,
	 'ia/disabledtruebtn'
  ) 
	 const data = await AiService.generateRecipe(prompt)

   for await(const textPart of data){
    //Función set que escribe en el state 
    set((state => ({
       recipe: state.recipe + textPart
    })),
   	undefined,
	 'ia/responseIa'
    )
  }
    set(
     {isGenerating: false},
      undefined,
	   'ia/disabledfalsebtn'
    )
  }	
}) 