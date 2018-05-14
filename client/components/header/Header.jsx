import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeDetailsPage } from "../details";
import { removeSearchPage } from "../search";
import styles from "./style";
import PropTypes from "prop-types";

const Header = props => {
	let utilSpace;
	if (props.details) {
		utilSpace = (
			<h2>
				<Link onClick={props.loadDetailsPage} to="/search">Назад</Link>
			</h2>
		);
	}
	return (
		<header className={styles.header}>
			<h1>
				<Link onClick={props.loadDetailsPage} to="/">Home</Link>
			</h1>
			{utilSpace}
		</header>
	);
};

Header.propTypes = {
	details: PropTypes.string,
	loadDetailsPage: PropTypes.func.isRequired,
	detailsPage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ detailsPage: state.detailsPage });
const mapDispatchToProps = dispatch => ({
	loadDetailsPage() {
		dispatch(removeDetailsPage());
		dispatch(removeSearchPage());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
