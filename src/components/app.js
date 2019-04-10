import React, {Component} from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux';
import Products from './products';
import EditProduct from './editProduct';

import '../../styles/style.css';
class App extends Component {
    
    render () {
        return (
            <Switch>
                <Route exact path='/' component={Products} />
                <Route exact path='/editProduct' component={EditProduct} />
            </Switch>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));