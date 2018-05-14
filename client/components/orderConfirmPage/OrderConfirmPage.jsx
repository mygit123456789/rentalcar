import React, { Component } from "react";
import styles from "./style";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class OrderConfirmPage extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		fetch(`http://localhost:3000/orderConfirm/?username=${this.props.userName}
			&userLastName=${this.props.userLastName}
			&email=${this.props.email}
			&startDate=${this.props.startDate}
			&endDate=${this.props.endDate}
			&city=${this.props.city}
			&auto=${this.props.auto}
			&poster=${this.props.poster}`)
			.then(console.warn("ServerRequest done"));
	}

	render() {
		return(
			<div className={styles.landing}>
				<h1>Спасибо за ваш заказ!!!</h1>
				<table className={styles.table} cols="2" rules="rows" bgcolor="#3368b7" border="5" align='center' cellPadding="10" width="700">
					<caption>Детали заказа</caption>
					<tbody>
						<tr><td align="left">ИМЯ заказчика:</td><td>{this.props.userName}</td></tr>
						<tr><td align="left">ФАМИЛИЯ заказчика:</td><td>{this.props.userLastName}</td></tr>
						<tr><td align="left">Email заказчика:</td><td>{this.props.email}</td></tr>
						<tr><td align="left">Начало брони:</td><td>{this.props.startDate}</td></tr>
						<tr><td align="left">Конец брони:</td><td>{this.props.endDate}</td></tr>
						<tr><td align="left">Город:</td><td>{this.props.city}</td></tr>
						<tr><td align="left">Автомобиль:</td><td>{this.props.auto}</td></tr>
						<tr><td align="left">Автомобиль:</td><td><img src={`/img/posters/${this.props.poster}`} width="320" height="180"></img></td></tr>
					</tbody>
				</table>
				<button>
					<Link to="/" > На главную </Link>
				</button>
			</div>
		);
	}
}
OrderConfirmPage.propTypes = {
	userName: PropTypes.string,
	userLastName: PropTypes.string,
	email: PropTypes.string,
	startDate: PropTypes.string,
	endDate: PropTypes.string,
	city: PropTypes.string,
	auto: PropTypes.string,
	poster: PropTypes.func
};

const mapStateToProps = state => ({
	userName: state.orderForm.userName,
	userLastName: state.orderForm.userSurname,
	email: state.orderForm.userEmail,
	startDate: state.filters.startDate,
	endDate: state.filters.endDate,
	city: state.filters.city,
	auto: state.detailsPage.manufacturer + " " + state.detailsPage.model,
	poster: state.detailsPage.poster
});

export default connect( mapStateToProps )( OrderConfirmPage );
