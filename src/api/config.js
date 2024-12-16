function getURL(api) {

	const BASE_URL = `${import.meta.env.VITE_API_ENDPOINT}/api`;

	switch(api) {
		case "LOGIN":
			return `${BASE_URL}/auth/login`;

		case "ADD_USER":
			return `${BASE_URL}/auth/register`;
		case "GET_USERS":
			return `${BASE_URL}/user`;
		case "GET_USER":
		case "UPDATE_USER":	
		case "DELETE_USER":
			return (id) => `${BASE_URL}/user/${id}`;
		
		default:
			return BASE_URL;
	}
}

export default getURL;