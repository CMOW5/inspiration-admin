import React, {Component} from 'react';

/* router */
import {Switch, Route} from 'react-router-dom';

/* styles */
import './main.css';

/* utils */
import Logger from 'utils/logger/logger';

/* components */
import MainNavBar from 'components/navs/main_nav/MainNavBar';
import SideNav from 'components/navs/side_nav/SideNav';
import DashBoard from 'pages/dashboard/DashBoard';

// products
import ProductsList from 'pages/products/ProductsList';
import ShowProduct from 'pages/products/show/ShowProduct';
import CreateProductForm from 'pages/products/create/CreateProductForm';
import EditProductForm from 'pages/products/edit/EditProductForm';

import Footer from 'components/footer/Footer';

/**
 * main page
 */
export default class Main extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      openSideNav: false,
    };
    this.componentName = 'Main ';
    Logger.log(this.componentName + 'constructor');
  }

  toggleSideNav = () => {
    this.setState((prevState) => ({
      openSideNav: !prevState.openSideNav,
    }));
  }
  /**
   * @return {ReactNode}
   */
  render() {
    Logger.log(this.componentName + 'render');
    return (

      <div>

        <SideNav openSideNav = {this.state.openSideNav} />

        <div className="right-panel">

          <MainNavBar
            onToggleSideNav = {this.toggleSideNav}
            history={this.props.history} />

          <div className="container">

            <Switch>

              <Route exact path='/' component={DashBoard}/>

              {/* products */}
              <Route exact path = '/products'
                component = {ProductsList} />
              <Route exact path = '/products/create'
                component = {CreateProductForm} />
              <Route exact path = '/products/show/:id'
                component = {ShowProduct} />
              <Route exact path = '/products/edit/:id'
                component = {EditProductForm}/>

            </Switch>

          </div>

          <Footer />

        </div>

      </div>

    );
  }
}
