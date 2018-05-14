import { createActions, handleActions } from "redux-actions";

const defaultState = {};
export const {setDetailsPage, removeDetailsPage} = createActions({
	"SET_DETAILS_PAGE": (url) => (
		fetch(url)
			.then(resp => resp.json())
			.then(car => ({detailsPage: car}) ) ),
	"REMOVE_DETAILS_PAGE": () => ({detailsPage: {} }) });

export const detailsPageReducer = handleActions({
	[setDetailsPage] (state, {payload: {detailsPage} }) {
		return detailsPage; },
	[removeDetailsPage] (state, {payload: {detailsPage} }) {
		return detailsPage; }
}, defaultState );
