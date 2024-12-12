
export const INITIAL_STATE = {
      title: "",
      desc: "",
      totalStars: 1,
      numberStars: 1,
      cat: "",
      price: 0,
      cover: "",
      img: [],
      shortTitle: "",
      shortDesc: "",
      deliveryTime: 0,
      revisionNumber: 0,
      features: [],
      
}
export const gigReducer = (state,action)=>{
    switch(action.type){
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        case "ADD_IMAGE":
            return {
                ...state,
                cover: action.payload.cover,
                img: action.payload.images,
            };
        case "ADD_FEATURE":
            return{
                ...state,
                features: [...state.features,action.payload]
            }
        case "REMOVE_FEATURE":
            return{
                ...state,
                features: state.features.filter(
                    (feature)=>feature !== action.payload
                )
            };

    default: 
         return state;
        
    }
}