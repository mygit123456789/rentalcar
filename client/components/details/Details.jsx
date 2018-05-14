import React, { Component } from "react";
import Header from "../header/Header";
import styled from "styled-components";
import Slider from "../slider/Slider";
import { setDetailsPage } from "./";
import { connect } from "react-redux";
import styles from "./style";
import PropTypes from "prop-types";
import { OrderForm } from "../orderForm";


class Details extends Component {
	constructor(props) {
		super(props);
		this.Wrapper = styled.ul`
      list-style-type: none;
    `;
		this.Wrapper = styled.ul`
      list-style-type: none;
    `;
		this.Image = styled.img`
      width: 46%;
      float: left;
      margin-right: 10px;
    `;
	}

	componentWillMount() {
		const url = `http://localhost:3000/car/${this.props.match.params.id}`;
		this.props.loadDetailsPage(url);
	}

	render() {
		const { detailsPage } = this.props;
		return (
			<React.Fragment>
				{Object.keys(detailsPage).length ? (
					<div className={styles.details}>
						<Header className="header" details="true" />
						<section>
							<h1>{detailsPage.manufacturer}</h1>
							<img
								src={`/img/posters/${detailsPage.poster}`}
								alt={`Poster for ${detailsPage.manufacturer}`}
							/>
							<h2>{detailsPage.model}</h2>
							<h3>{`Color: ${detailsPage.color}`}</h3>
							<this.Wrapper>
								<li>{`Color: ${detailsPage.color}`}</li>
								<li>{`Body: ${detailsPage.body}`}</li>
								<li>{`Engine: ${detailsPage.engine}`}</li>
								<li>{`Max speed: ${detailsPage.maxSpeed}`}</li>
							</this.Wrapper>
						</section>
						<Slider picsForSlider={detailsPage.picsForSlider} />
						<OrderForm />

					</div>
				) : ( <h1>Loading...</h1> )}
			</React.Fragment>
		);
	}
}
Details.propTypes = {
	match: PropTypes.object.isRequired,
	loadDetailsPage: PropTypes.func.isRequired,
	detailsPage: PropTypes.object.isRequired
};



const mapStateToProps = state => ({ detailsPage: state.detailsPage });
const mapDispatchToProps = dispatch => ({
	loadDetailsPage(url) {
		dispatch(setDetailsPage(url));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
