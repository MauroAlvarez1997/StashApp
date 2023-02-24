const GET_ACTIVITIES = "activities/GET_ACTIVITIES";
const UPDATE_ACTIVITIES = "activities/UPDATE_ACTIVITIES";
const CREATE_ACTIVITIES = "activities/CREATE_ACTIVITIES";
const DELETE_ACTIVITIES = "activities/DELETE_ACTIVITIES";


const getAllActivities = (data) => ({
	type: GET_ACTIVITIES,
	payload: data,
});
const updateActivities = (data) => ({
	type: UPDATE_ACTIVITIES,
	payload: data,
});
const createActivities = (data) => ({
	type: CREATE_ACTIVITIES,
	payload: data,
});
const deleteActivities = (data) => ({
	type: DELETE_ACTIVITIES,
	payload: data,
});

export const thunkDeleteActivities = (id) => async (dispatch) => {
	const response = await fetch(`/api/transactions/delete/${id}`, {
		method: "DELETE",
	});
	if (response.ok) {
		const removedTrnsaction = await response.json();
		dispatch(deleteActivities(removedTrnsaction));
		return removedTrnsaction;
	}
};
export const thunkCreateActivity = (data) => async (dispatch) => {
	const response = await fetch(`/api/transactions/create`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (response.ok) {
		let newActivity = await response.json();

		dispatch(createActivities(newActivity));
	}
};

export const thunkUpdateActivity = (data, transaction_id) => async (dispatch) => {
	const response = await fetch(`/api/transactions/update/${transaction_id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (response.ok) {
		let updatedActivity = await response.json();

		dispatch(updateActivities(updatedActivity));
	}
};

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
			newState = action.payload;
			return newState;
		case UPDATE_ACTIVITIES:
			const updatedActivity = action.payload;
			newState.all_transactions[updatedActivity.id] = { ...updatedActivity };
			newState.transactions_out[updatedActivity.id] = { ...updatedActivity };
			return newState;
		case CREATE_ACTIVITIES:
			const newActivity = action.payload
			newState.all_transactions[newActivity.id] = newActivity
			newState.transactions_out[newActivity.id] = newActivity
			return newState
		case DELETE_ACTIVITIES:
			const deletedActivity = action.payload
			console.log('deleted activity in reducer',deletedActivity)
			delete newState.all_transactions[deletedActivity.id]
			delete newState.transactions_out[deletedActivity.id]
			return newState;
		default:
			return newState;
	}
}
