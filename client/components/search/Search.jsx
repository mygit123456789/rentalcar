import React, { Component } from "react";
import { connect } from "react-redux";
import { setSearchPage } from "/";
import ShowCard from "../showCard/ShowCard";
import Header from "../header/Header";
import styles from "./style";
import PropTypes from "prop-types";

class Search extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.loadCars(`http://localhost:3000/search/?city=${this.props.city}&startDate=${this.props.startDate}&endDate=${this.props.endDate}`);
	}

	render() {
		const { cars } = this.props.searchPage;
		return (
			<React.Fragment>
				{cars.length ? (
					<div className={styles.search}>
						<Header />
						<div>{cars.map(car => <ShowCard key={car.ID} {...car} />)} </div>
					</div>
				) : ( <h1>Loading...</h1> )}
			</React.Fragment>
		);
	}
}

Search.propTypes = {
	loadCars: PropTypes.func.isRequired,
	searchPage: PropTypes.object.isRequired,
	city: PropTypes.string.isRequired,
	startDate: PropTypes.string.isRequired,
	endDate: PropTypes.string.isRequired
};

const mapStateToProps = state => ({ searchPage: state.searchPage,
	city: state.filters.city,
	startDate: state.filters.startDate,
	endDate: state.filters.endDate
});

const mapDispatchToProps = dispatch => ({
	loadCars(url) {
		dispatch(setSearchPage(url));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
