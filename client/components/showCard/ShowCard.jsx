import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  width: 32%;
  border: 1px solid #333;
  border-radius: 4px;
  margin-bottom: 25px;
  padding-right: 10px;
  overflow: hidden;
`;
const Image = styled.img`
  width: 46%;
  float: left;
  margin-right: 10px;
`;

class ShowCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Wrapper>
				<Link
					to={`/search/car/${this.props.ID}`}
					key={this.props.ID}
					style={{ textDecoration: "none" }}
				>
					<Image
						alt={`${this.props.manufacturer}actual picture`}
						src={`/img/posters/${this.props.poster}`}
					/>
					<div>
						<h3>{this.props.manufacturer}</h3>
						<button>Заказать</button>
					</div>
				</Link>
			</Wrapper>
		);
	}
}

ShowCard.propTypes = {
	ID: PropTypes.string.isRequired,
	poster: PropTypes.string.isRequired,
	manufacturer: PropTypes.string.isRequired,
	detailsPage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ detailsPage: state.detailsPage });
const mapDispatchToProps = dispatch => ({
	handleSetDetailsPageChange() {
		dispatch();
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowCard);
