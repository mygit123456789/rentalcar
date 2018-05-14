import { createStore, compose, applyMiddleware, combineReducers } from "redux";

import promiseMiddleware from "redux-promise";

import { filterReducer } from "components/landing";
import { searchPageReducer } from "components/search";
import { detailsPageReducer } from "components/details";
import { orderFormReducer } from "components/orderForm";

export const rootReducer = combineReducers({
	searchPage: searchPageReducer,
	detailsPage: detailsPageReducer,
	filters: filterReducer,
	orderForm: orderFormReducer
});

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(promiseMiddleware),
		typeof window === "object" &&
    typeof window.devToolsExtension !== "undefined"
			? window.devToolsExtension()
			: f => f
	)
);

export default store;
