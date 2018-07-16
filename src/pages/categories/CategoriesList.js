import React, {Component} from 'react';

/* redux */
import {connect} from 'react-redux';
import {goToRoute} from 'store/actions/router-actions';

/* routes */
import {withRouter} from 'react-router-dom';
import routerHandler from 'router/router-handler';
import categoriesRoutes from 'router/routes/categories-routes';

/* api */
import categoriesRequest
  from 'services/api/categories/categories-request';

/* utils */
import Paginator from 'utils/paginator/paginator';
import Logger from 'utils/logger/logger';

/* components */
import ListHeader from 'pages/utils/list_headers/ListHeader';
import SingleCategoryRow from './SingleCategoryRow';
import Pagination from 'components/pagination/Pagination';
import Loading from 'components/utils/loading/Loading';

/**
 * a list to show the categories list
 */
class CategoriesList extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      paginator: new Paginator(),
      selectedCategory: {},
      showDeleteModal: false,
      searchKeyword: '',
      isFetching: true,
    };
    this.componentName = 'CategoriesList';
    this.fetchCategories = this.fetchCategories.bind(this);
    this.pageSelected = this.pageSelected.bind(this);

    /* action buttons */
    this.createCategory = this.createCategory.bind(this);
    this.showCategory = this.showCategory.bind(this);
    this.editCategory = this.editCategory.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);

    this.onDeleteSucess = this.onDeleteSucess.bind(this);
    this.onDeleteCancel = this.onDeleteCancel.bind(this);
    this.searchCategories = this.searchCategories.bind(this);
    this.renderMainTable = this.renderMainTable.bind(this);
  }

  /**
   *
   */
  componentDidMount() {
    Logger.log(this.componentName + 'componentDidMount');

    /* show a loading icon an them fetch the categories */
    this.setState({
      isFetching: true,
    }, this.fetchCategories);
  }

  /**
   * notify the parent that the see see button was clicked
   * @param {number} id category id
   */
  createCategory() {
    const route = categoriesRoutes.create();
    routerHandler.goTo(this.props.history, route);
  }

  /**
   * notify the parent that the see see button was clicked
   * @param {number} id category id
   */
  showCategory(id) {
    const route = categoriesRoutes.show(id);
    routerHandler.goTo(this.props.history, route);
  }

  /**
   * notify the parent that the see edit button was clicked
   * @param {number} id category id
   */
  editCategory(id) {
    const route = categoriesRoutes.edit(id);
    routerHandler.goTo(this.props.history, route);
  }

  /**
   * notify the parent that the see delete button was clicked
   * @param {object} category
   */
  showDeleteModal(category) {
    Logger.log('selected = ', category);
    this.setState({
      selectedCategory: category,
      showDeleteModal: true,
    });
  }

  /**
   *
   */
  onDeleteSucess() {
    // refresh the categories list
    this.setState({
      selectedCategory: {},
      showDeleteModal: false,
    }, this.fetchCategories);
  }

  /**
   * close the delete modal
   */
  onDeleteCancel() {
    this.setState({
      selectedCategory: {},
      showDeleteModal: false,
    });
  }

  /**
   * @param {string|number} page
   */
  pageSelected(page) {
    if (Number.isInteger(page)) {
      const params = {page: page};
      this.fetchCategories(params);
    } else {
      // the page is a url
      const url = page;
      this.fetchCategories({}, url);
    }
  }

  /**
   * search the categories with the given keyword
   * @param {*} keyword
   */
  searchCategories(keyword) {
    this.setState(({
      searchKeyword: keyword,
    }), this.fetchCategories);
  }

  /**
   * fetch the categories from the db
   * @param {object} params
   * @param {string} url
   */
  async fetchCategories(params={}, url) {
    params.keyword = this.state.searchKeyword;
    const categories = await categoriesRequest.fetchAllCategories();
    // const response = await categoriesRequest.fetchCategories(params, url);
    this.setState({
      categories: categories,
      isFetching: false,
      // paginator: new Paginator(response.paginator),
    });
  }

  /**
   * @param {array} categories
   * @return {ReactNode}
   */
  renderMainTable(categories) {
    if (this.state.isFetching) {
      return <Loading show={true} title="categories" />;
    }

    const categoriesRows = categories.map((category) => {
      return <SingleCategoryRow
        category = {category}
        key = {category.id}
        onSeeButtonClicked = {this.showCategory}
        onEditButtonClicked = {this.editCategory}
        onDeleteButtonClicked = {this.showDeleteModal}
      />;
    });

    return (
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>name</th>
            <th>parent</th>
            <th><abbr title="image">image</abbr></th>
            <th>actions</th>
          </tr>
        </thead>
        <tfoot>
        </tfoot>
        <tbody>
          {categoriesRows}
        </tbody>
      </table>
    );
  }

  /**
   * @return {ReactNode}
   */
  render() {
    Logger.log(this.componentName + 'render');

    return (
      <div>
        <ListHeader
          title = 'categories'
          icon = 'fa fa-shopping-bag fa-2x'
          onClick = {this.createCategory}
          onSearch = {this.searchCategories}
        />

        {this.renderMainTable(this.state.categories)}

        <Pagination
          paginator = {this.state.paginator}
          onPageSelected = {this.pageSelected}
        />
        {/*
        <DeleteProductModal
          show = {this.state.showDeleteModal}
          product = {this.state.selectedProduct}
          onDeleteSucess = {this.onDeleteSucess}
          onDeleteCancel = {this.onDeleteCancel}
        />
        */}

      </div>

    );
  }
}

// which properties of the global store do i wanna use in this component
const mapStateToProps = (state) => {
  return {
    // router: state.routerReducer,
    user: state.userReducer,
  };
};

// map the actions i can execute (send) to the reducers
const mapDispatchToProps = (dispatch) => {
  return {
    goToRoute: (route) => {
      dispatch(goToRoute(route));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoriesList)
);
