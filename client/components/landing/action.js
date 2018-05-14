import { createActions, handleActions } from "redux-actions";

const now = new Date();
let d;
const monthNormilizer = () => {
	let m = now.getMonth();
	if (m < 9) {
		const n = m + 1;
		return (m = `0${n}`);
	} else if (m >= 9) {
		return (m += 1);
	}
};
if(now.getDate() < 10) {
	d = `0${now.getDate()}`;
}
else if(now.getDate() >= 10) {
	d = `${now.getDate()}`;
}

const currentStartDate = `${now.getFullYear()}-${monthNormilizer()}-${d}`;
const currentEndDate = currentStartDate;

//default -> chooseCity
const defaultState = {city: "Minsk", startDate: currentStartDate, endDate: currentEndDate};

export const {setCityFilter, removeCityFilter, setStartDate, setEndDate} = createActions({
	"SET_CITY_FILTER": (city) => ({ city: city }),
	"REMOVE_CITY_FILTER": () => ({ city: "ChooseCity" }),
	"SET_START_DATE": (date1) => ({ date1: date1 }),
	"SET_END_DATE": (date2) => ({ date2: date2 })
});

export const filterReducer = handleActions({
	[setCityFilter] (state, {payload: {city}}) {
		return { ...state, city: city };
	},
	[removeCityFilter] (state, {payload: {city}}) {
		return { ...state, cityFilter: city };
	},
	[setStartDate] (state, {payload: {date1}}) {
		return { ...state, startDate: date1 };
	},
	[setEndDate] (state, {payload: {date2}}) {
		return { ...state, endDate: date2 };
	}
}, defaultState);
