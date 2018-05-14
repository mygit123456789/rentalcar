import React from "react";
import { storiesOf } from "@storybook/react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Search } from "../search";
import { searchPageReducer } from "../search/action";
import createBrowserHistory from "history/createBrowserHistory";
import promiseMiddleware from "redux-promise";
import { routerReducer } from "react-router-redux";
import { Provider } from "react-redux";
import Router from "react-router-dom";

const rootReducer = combineReducers({
	searchPage: searchPageReducer,
	routing: routerReducer
});

const store = createStore( rootReducer,
	applyMiddleware(promiseMiddleware));

const history = createBrowserHistory();
// const history2 = syncHistoryWithStore(history, store);

storiesOf("Search", module)
	.addDecorator((Search) => (
		<Provider store={store}>
			<Router history={history} >
				{Search()}
			</Router>
		</Provider>))
	.add("Search", () => <Search />);
