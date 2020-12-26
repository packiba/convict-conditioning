import {SET_CATEGORY_ACTIVE, SET_CATEGORY_LIST} from '../actions/types'

const initialState = {
  categoriesList: [],
  activeCategory : []
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY_LIST:
      const categoriesCount = action.payload.length
      const newActiveCategory = new Array(categoriesCount).fill(false)
      newActiveCategory[0] = true
      return { ...state, categoriesList: action.payload, activeCategory: newActiveCategory};
    case SET_CATEGORY_ACTIVE: {
      const newActiveCategory = new Array(state.categoriesList.length).fill(false)
      newActiveCategory[action.payload] = true
      return {...state, activeCategory: newActiveCategory}
    }
    default:
      return state;
  }
};

export default categories;