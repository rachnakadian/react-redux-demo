
const actions = {
	updateProductDetails: function(data) {
		return {
			type: 'updateProductDetails',
			data
		}
	},
	saveDetailsInList: function(data) {
		return (dispatch, getState) => {
			let products = getState().products.productsList;
			products = products.map(product => {
				if(product.productId == data.productId) {
					return data;
				} else {
					return product;
				}
			});
			dispatch({type: 'updateProductsList', data: products});
		}
	}
}

export default actions;