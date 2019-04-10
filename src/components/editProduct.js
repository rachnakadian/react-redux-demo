import React, {Component, Fragment} from 'react';
import { Route, withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import actions from '../actions';

class EditProduct extends Component {
	constructor(props) {
		super(props);
		let productDetails = this.props.productDetails ? this.props.productDetails : {};
		this.state = {
			productId: productDetails.productId ? productDetails.productId : '',
			name: productDetails.name ? productDetails.name : '',
			weight: productDetails.weight ? productDetails.weight : '',
			availability: productDetails.availability ? productDetails.availability : '',
			productUrl: productDetails.productUrl ? productDetails.productUrl : '',
			pricingTier: productDetails.pricingTier ? productDetails.pricingTier : '',
			priceRange: productDetails.priceRange ? productDetails.priceRange : '',
			isEditable: productDetails.isEditable ? productDetails.isEditable : false,
		}
		this.updateState = this.updateState.bind(this);
		this.saveDetails = this.saveDetails.bind(this);
		this.trimStateValues = this.trimStateValues.bind(this);
	}

	componentDidMount() {
		if(!this.props.productDetails) {
			this.props.history.push('/');
		}
	}

	updateState(e) {
		let {name, value, type} = e.target;
		if(type == 'checkbox') {
			this.setState({[name]: e.target.checked});
		} else {
			if(name == 'pricingTier') {
				this.setState({[name]: value, priceRange: ''});
			} else {
				this.setState({[name]: value});
			}
		}
	}

	saveDetails(e) {
		e.preventDefault();
		this.trimStateValues(() => {
			let state = this.state;
			if(state.name && state.weight && state.productUrl && state.pricingTier && state.priceRange) {
				let data = {
					productId: this.state.productId ? this.state.productId : '',
					name: this.state.name ? this.state.name : '',
					weight: this.state.weight ? this.state.weight : '',
					availability: this.state.availability ? this.state.availability : '',
					productUrl: this.state.productUrl ? this.state.productUrl : '',
					pricingTier: this.state.pricingTier ? this.state.pricingTier : '',
					priceRange: this.state.priceRange ? this.state.priceRange : '',
					isEditable: this.state.isEditable ? this.state.isEditable : false
				}
				this.props.actions.saveDetailsInList(data);
				this.props.history.push('/');	
			} else {
				toast.error("Please fill all required fields", {
			        position: toast.POSITION.TOP_RIGHT
			    });
			}
		});
	}

	trimStateValues(callback) {
		let data = this.state;
		let updated = {}
		Object.keys(data).filter(key => {
			if (typeof data[key] == 'string') {
				updated[key] = data[key].trim()
			} else {
				updated[key] = data[key]
			}
		});
		this.setState(updated, () => {
			callback();
		});
	}

    render () {
        return (
        	<div>
        		<ToastContainer />
        		<h3 className="header">
					Edit Product
				</h3>
				<div className="back-link">
					<NavLink to="/"> Back to list </NavLink>
				</div>
				<div className="edit-form">
					<form>
						<div className="form-element">
							<div className="label">
								Name*
							</div>
							<div className="input-element">
								<input type="text" name="name" onChange={this.updateState} value={this.state.name} required="required" />
							</div>
						</div>

						<div className="form-element">
							<div className="label">
								Weight*
							</div>
							<div className="input-element">
								<input type="text" name="weight" onChange={this.updateState} value={this.state.weight} required="required" />
							</div>
						</div>

						<div className="form-element">
							<div className="label">
								Availability
							</div>
							<div className="input-element">
								<input type="number" onChange={this.updateState} value={this.state.availability} name="availability" />
							</div>
						</div>

						<div className="form-element">
							<div className="label">
								Product Url*
							</div>
							<div className="input-element">
								<input type="text" name="productUrl" onChange={this.updateState} value={this.state.productUrl} required="required" />
							</div>
						</div>

						<div className="form-element">
							<div className="label">
								Price Tier*
							</div>
							<div className="input-element">
								<input type="radio" onChange={this.updateState} checked={this.state.pricingTier == 'budget' ? true : false} required="required" name="pricingTier" value="budget" /> Budget<br />
			  					<input type="radio" onChange={this.updateState} checked={this.state.pricingTier == 'premier' ? true : false} required="required" name="pricingTier" value="premier" /> Premier<br />
							</div>
						</div>

						<div className="form-element">
							<div className="label">
								Price Range*
							</div>
							<div className="input-element">
								<select name="priceRange" onChange={this.updateState} value={this.state.priceRange} required="required">
								  	<option></option>
								  	{(this.state.pricingTier != '') && this.props.pricingInfo && this.props.pricingInfo[this.state.pricingTier] ? (
								  		this.props.pricingInfo[this.state.pricingTier].map((data, index) =>
								  			<option key={index} value={data}>{data}</option>
								  		)
								  	) : <Fragment></Fragment>}
								</select>
							</div>
						</div>

						<div className="form-element">
							<div className="label">
								Is Editable
							</div>
							<div className="input-element">
								<input type="checkbox" onChange={this.updateState} checked={this.state.isEditable} name="isEditable" required="required" /> Product is editable<br />
							</div>
						</div>

						<button className='submit-btn' type="submit" onClick={this.saveDetails}>Submit </button>
					</form>
				</div>
	        </div>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		productDetails: state.products.productDetails,
		pricingInfo: state.products.pricingInfo,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProduct));