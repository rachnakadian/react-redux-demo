import React, {Component} from 'react';
import { Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';

class Products extends Component {
	constructor(props) {
		super(props);
		this.openEditForm = this.openEditForm.bind(this);
	}

	openEditForm(productData) {
		this.props.actions.updateProductDetails(productData);
		this.props.history.push('/editProduct');
	}

    render () {
        return (
        	<div>
        		<h3 className="header"> Products List </h3>
        		<table cellSpacing="0" cellPadding="0">
        			<thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Weight(grams)</th>
                            <th>Availability</th>
                            <th>URL</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
		        		{this.props.productsList && this.props.productsList.length ? (
		        			this.props.productsList.map((product, index) =>
		        				<Product key={product.productId} data={product} index={index} openEditForm={this.openEditForm} />
		        			)
		        		) : <tr><td>No Records Found</td></tr>}
		        	</tbody>
		        </table>
	        </div>
        )
    }
}

const Product = (props) => {
	return (
		<tr >
			<td >{props.index+1}</td>
			<td >{props.data.name}</td>
			<td >{props.data.weight}</td>
			<td >{props.data.availability}</td>
			<td >
				<a href={props.data.productUrl} target="_blank">
					See Product
				</a>
			</td>
			<td>
				{props.data.isEditable ?
					<button className='edit-button' onClick={(e) => props.openEditForm(props.data)}>
						Edit
					</button>
				: ''}
			</td>
		</tr>
	)
}

const mapStateToProps = (state) => {
	return {
		productsList: state.products.productsList
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products));