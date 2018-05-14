import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setUserName, setUserSurname, setUserEmail } from "./action";
import styles from "./style";

class OrderForm extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<form className={styles.flex}>
        Имя:<input type='text' onChange={this.props.handleUserName} />
        Фамилия:<input type='text' onChange={this.props.handleLastName} />
        E-Mail:<input type='text' onChange={this.props.handleEmail}/>
				<Link to="/order"> Сделать заказ </Link>
			</form>
		);
	}
}

OrderForm.propTypes = {
	userName: PropTypes.string,
	userSurname: PropTypes.string,
	email: PropTypes.string,
	handleUserName: PropTypes.func,
	handleLastName: PropTypes.func,
	handleEmail: PropTypes.func,
};

const mapStateToProps = ( state ) => ({
	userName: state.orderForm.userName,
	userSurname: state.orderForm.userSurname,
	userEmail: state.orderForm.userEmail
});

const mapDispatchToProps = dispatch => ({
	handleUserName(event) {
		dispatch(setUserName(event.target.value));
	},
	handleLastName(event) {
		dispatch(setUserSurname(event.target.value));
	},
	handleEmail(event) {
		dispatch(setUserEmail(event.target.value));
	}
});


export default connect ( mapStateToProps, mapDispatchToProps )( OrderForm );
