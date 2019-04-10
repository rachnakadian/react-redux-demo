const products = (state = {}, action) => {
	switch (action.type) {
		case 'updateProductDetails':
		return { ...state, productDetails: action.data }

		case 'updateProductsList':
		return {...state, productsList: action.data, productDetails: {}}

		default:
		return state
	}
}

export default products;