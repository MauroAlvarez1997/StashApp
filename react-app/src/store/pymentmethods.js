const GET_PAYMENT_METHODS = "activities/GET_PAYMENT_METHODS";
const UPDATE_PAYMENT_METHODS = "activities/UPDATE_PAYMENT_METHODS";
const CREATE_PAYMENT_METHODS = "activities/CREATE_PAYMENT_METHODS";
const DELETE_PAYMENT_METHODS = "activities/DELETE_PAYMENT_METHODS";


const getAllPaymentMethods = (data) => ({
	type: GET_PAYMENT_METHODS,
	payload: data,
});
const updatePaymentMethods = (data) => ({
	type: UPDATE_PAYMENT_METHODS,
	payload: data,
});
const createPaymentMethods = (data) => ({
	type: CREATE_PAYMENT_METHODS,
	payload: data,
});
const deletePaymentMethods = (data) => ({
	type: DELETE_PAYMENT_METHODS,
	payload: data,
});

export const thunkDeletePaymentMethod = (id) => async (dispatch) => {
	const response = await fetch(`/api/paymentmethods/delete/${id}`, {
		method: "DELETE",
	});
	if (response.ok) {
		const removedPaymentMethod = await response.json();
		dispatch(deletePaymentMethods(removedPaymentMethod));
		return removedPaymentMethod;
	}
};
export const thunkCreatePaymentMethod = (data) => async (dispatch) => {
	const response = await fetch(`/api/paymentmethods/create_card`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (response.ok) {
		let newPaymentMethod = await response.json();

		dispatch(createPaymentMethods(newPaymentMethod));
		return null
	} else if(response.status < 500){
		const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
	} else {
		return ["A payment method with these credentils is already in use."];
	}
};

export const thunkUpdatePaymentMethod = (data, paymentmethod_id) => async (dispatch) => {
	const response = await fetch(`/api/paymentmethods/update/${paymentmethod_id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (response.ok) {
		let updatedPaymentMethod = await response.json();

		dispatch(updatePaymentMethods(updatedPaymentMethod));
	}
};

export const thunkAllPaymentMethods = () => async (dispatch) => {
	const response = await fetch("/api/paymentmethods/all");

	if (response.ok) {
		const data = await response.json();
		dispatch(getAllPaymentMethods(data));
		return data;
	}
};

const normalize = (arr) => {
	const resultObj = {};
	arr.forEach((element) => (resultObj[element.id] = element));
	return resultObj;
};

const initialState = {
	all_payment_methods: {}
};

export default function paymentMethods(state = initialState, action) {
	let newState = { ...state };
	switch (action.type) {
		case GET_PAYMENT_METHODS:
			newState = action.payload;
			return newState;
		case UPDATE_PAYMENT_METHODS:
			const updatedPaymentMethod = action.payload;
			newState.all_payment_methods[updatedPaymentMethod.id] = { ...updatedPaymentMethod };
			return newState;
		case CREATE_PAYMENT_METHODS:
			const newPaymentMethod = action.payload
			newState.all_payment_methods[newPaymentMethod.id] = newPaymentMethod
			return newState
		case DELETE_PAYMENT_METHODS:
			const deletedPaymentMethod = action.payload
			delete newState.all_payment_methods[deletedPaymentMethod.id]
			return newState;
		default:
			return newState;
	}
}
