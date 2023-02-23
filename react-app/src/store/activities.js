const GET_ACTIVITIES = "activities/GET_ACTIVITIES";


const getAllActivities = (data) => ({
	type: GET_ACTIVITIES,
	payload: data,
});

export const thunkAllActivities = () => async (dispatch) => {
	const response = await fetch("/api/transactions/all");

	if (response.ok) {
		const data = await response.json();
		dispatch(getAllActivities(data));
		return data;
	}
};

const normalize = (arr) => {
	const resultObj = {};
	arr.forEach((element) => (resultObj[element.id] = element));
	return resultObj;
};

const initialState = {
	all_transactions: {},
  transactions_out: {},
	transactions_in: {},
};

export default function transactions(state = initialState, action) {
	let newState = { ...state };
	switch (action.type) {
		case GET_ACTIVITIES:
			newState = { ...state };
			newState = action.payload;
			return newState;
		default:
			return state;
	}
}
