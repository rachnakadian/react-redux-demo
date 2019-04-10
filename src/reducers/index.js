import { combineReducers } from 'redux';
import { productsList, pricingInfo } from '../utilities/products';
import products from './products';

export const application = combineReducers({
	products
});

export const initialState =  {
	products : { productsList, pricingInfo }
};