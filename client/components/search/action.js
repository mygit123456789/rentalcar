import { createActions, handleActions } from "redux-actions";

const defaultState = { cars: [] };

export const {setSearchPage, removeSearchPage} = createActions({
	"SET_SEARCH_PAGE": (url) => (
		fetch(url)
			.then(resp => resp.json())
			.then(data => ({ page: data.cars }) ) ),

	"REMOVE_SEARCH_PAGE": () => ({page: [] })});

export const searchPageReducer = handleActions({
	[setSearchPage] (state, {payload: {page} }) {
		return {cars: page}; },
	[removeSearchPage] (state, {payload: {page} }) {
		return {cars: page};
	}
}, defaultState);
