export const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: localStorage.getItem("token") !== null,
    isLoading: false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    errors: {},
};


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESSFUL':
        case 'REGISTRATION_SUCCESSFUL':
            localStorage.setItem("token", action.data.token);
            localStorage.setItem("user", JSON.stringify(action.data.user));
            return {...state, ...action.data, isAuthenticated: true, isLoading: false, errors: null};

        case 'LOGOUT_FAILED':
        case 'LOGIN_FAILED':
        case 'REGISTRATION_FAILED':
        case 'LOGOUT_SUCCESSFUL':
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return {
                ...state, errors: action.data, token: null, user: null,
                isAuthenticated: false, isLoading: false
            };

        default:
            return state;
    }
};
