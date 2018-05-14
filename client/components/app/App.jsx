import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Landing } from "components/landing";
import { Search } from "components/search";
import { Details } from "components/details";
import { OrderConfirmPage } from "components/orderConfirmPage";
import { Provider } from "react-redux";
import store from "../../store";
import styles from "./style";

const four0four = () => <h1>404</h1>;
const App = () => (
	<BrowserRouter>
		<Provider store={store}>
			<div className={styles.app}>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/search" component={Search} />
					<Route exact path="/search/car/:id" component={Details} />
					<Route exact path="/order" component={OrderConfirmPage} />
					<Route component={four0four} />
				</Switch>
			</div>
		</Provider>
	</BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));
