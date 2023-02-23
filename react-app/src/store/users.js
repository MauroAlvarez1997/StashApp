const GET_ALL_USERS = "users/GET_ALL_USERS";


const getAllUsers = (data) => ({
	type: GET_ALL_USERS,
	payload: data,
});

export const thunkAllUsers = () => async (dispatch) => {
	const response = await fetch("/api/users/all");

	if (response.ok) {
		const data = await response.json();
		dispatch(getAllUsers(data));
		return data;
	}
};

const normalize = (arr) => {
	const resultObj = {};
	arr.forEach((element) => (resultObj[element.id] = element));
	return resultObj;
};

const initialState = {
	all_users: {},
  specific_user: {},
};

export default function users(state = initialState, action) {
	let newState = { ...state };
	switch (action.type) {
		case GET_ALL_USERS:
			newState = { ...state };
			newState.all_users = normalize(action.payload);
			return newState;
		default:
			return state;
	}
}
