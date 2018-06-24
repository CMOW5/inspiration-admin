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

/* routes */
import BaseRoutes from 'router/routes/base-routes';
import ProductRoutes from 'router/routes/products-routes';

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

    /* methods bindings */
    this.toggleSideNav = this.toggleSideNav.bind(this);
  }

  /**
   * toogle the sine navbar visibility
   */
  toggleSideNav() {
    this.setState((prevState) => ({
      openSideNav: !prevState.openSideNav,
    }));
  }

  /**
   * @return {ReactNode}
   */
  render() {
    Logger.log(this.componentName + 'render');

    const dashboardRoute = BaseRoutes.dashboard();
    const productsListRoute = ProductRoutes.base();
    const productsShowRoute = ProductRoutes.show();
    const productsCreateRoute = ProductRoutes.create();
    const productsEditRoute = ProductRoutes.edit();


    return (

      <div>

        <SideNav openSideNav = {this.state.openSideNav} />

        <div className="right-panel">

          <MainNavBar
            onToggleSideNav = {this.toggleSideNav}
            history={this.props.history} />

          <div className="container">

            <Switch>

              <Route exact path = '/'
                component={DashBoard}/>

              <Route exact path = {dashboardRoute}
                component={DashBoard}/>

              {/* products */}
              <Route exact path = {productsListRoute}
                component = {ProductsList} />
              <Route exact path ={productsCreateRoute}
                component = {CreateProductForm} />
              <Route exact path ={productsShowRoute}
                component = {ShowProduct} />
              <Route exact path = {productsEditRoute}
                component = {EditProductForm}/>

            </Switch>

          </div>

          <Footer />

        </div>

      </div>

    );
  }
}
