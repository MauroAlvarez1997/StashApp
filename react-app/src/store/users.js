const GET_ALL_USERS = "users/GET_ALL_USERS";
const UPDATE_PROFILE_PHOTO = 'users/UPDATE_PROFILE_PHOTO'

const getAllUsers = (data) => ({
	type: GET_ALL_USERS,
	payload: data,
});
const updateProfilePhoto = (data) => ({
	type: UPDATE_PROFILE_PHOTO,
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

export const thunkUpdateProfilePhoto = (formData) => async (dispatch) => {
	const response = await fetch(`/api/users/update_profile_photo`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});
	if (response.ok) {
		let updatedProfilePhoto = await response.json();

		dispatch(updateProfilePhoto(updatedProfilePhoto));
		return updatedProfilePhoto
	}
}

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
		case UPDATE_PROFILE_PHOTO:
			newState = { ...state };
			newState.current_user = action.payload;
			return newState;
		default:
			return state;
	}
}
