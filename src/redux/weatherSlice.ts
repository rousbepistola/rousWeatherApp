import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface weatherState {
    "city": string,    
    "current": number|string,    
    "low": number|string,    
    "high": number|string,    
    "humidity": number|string,
    "weather": string,
    additionalDetails: any | null
}

// Define the initial state using that type
const initialState: weatherState = {    
    "city": "Ottawa",    
    "current": 280,    
    "low": 260,    
    "high": 280,    
    "humidity": 62, 
    "weather":"Clear", 
    additionalDetails:{
        country:"Canada", 
        feels:"300", 
        sunrise:"1681996261", 
        sunset:"1682046680", 
        description:"sunny day :>",
    }  
}

export const weatherSlice = createSlice({
  name: 'homeWeather',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeHome: (state, action: PayloadAction<weatherState>) => {
        return {...state, ...action.payload}
    }
  },
})

export const { changeHome } = weatherSlice.actions

export default weatherSlice.reducer