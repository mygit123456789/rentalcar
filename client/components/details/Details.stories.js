import React from "react";
import { storiesOf } from "@storybook/react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import Details from "./Details";
import setDetailsPage  from "./action";
import createBrowserHistory from "history/createBrowserHistory";
import promiseMiddleware from "redux-promise";
import { routerReducer } from "react-router-redux";
import { Provider } from "react-redux";
import Router from "react-router-dom";

const rootReducer = combineReducers({
	detailsPage: setDetailsPage,
	routing: routerReducer
});

const store = createStore( rootReducer,
	applyMiddleware( promiseMiddleware ));

const history = createBrowserHistory();
// const history2 = syncHistoryWithStore(history, store);

storiesOf("Details", module)
	.addDecorator((Details) => (
		<Provider store={store}>
			<Router history={history} >
				{Details()}
			</Router>
		</Provider>))
	.add("Details", () => <Details />);
