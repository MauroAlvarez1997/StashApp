
const UPDATE_FUNDS = "funds/UPDATE_FUNDS";

const DELETE_FUNDS = "FUNDS/DELETE_FUNDS";



const updateFunds = (data) => ({
	type: UPDATE_FUNDS,
	payload: data,
});

export const thunkUpdateFunds = (data) => async (dispatch) => {
	const response = await fetch(`/api/funds/update`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (response.ok) {
		let updatedFunds = await response.json();

		dispatch(updateFunds(updatedFunds));
	}
};


const initialState = {
	funds: {},
};

export default function funds(state = initialState, action) {
	let newState = { ...state };
	switch (action.type) {
		case UPDATE_FUNDS:
			const updatedFunds = action.payload;
			newState = updatedFunds;
			return newState;
		case DELETE_FUNDS:
			const deletedActivity = action.payload
			delete newState.all_transactions[deletedActivity.id]
			delete newState.transactions_out[deletedActivity.id]
			return newState;
		default:
			return newState;
	}
}
