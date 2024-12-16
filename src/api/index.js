import axios from 'axios';

const DEFAULT_HEADERS = { 'Content-Type': 'application/json', Accept: 'application/json' };

function getAccessToken() {
	return localStorage.getItem('access_token');
}

axios.interceptors.request.use(
	(config) => {
		const token = getAccessToken();

		if (token) {
			config.headers.Authorization = token;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
)

axios.interceptors.request.use(
	(response) => response,
	(error) => {
		if(error.response?.status === 401 && window.location.pathname !== '/login') {
			localStorage.removeItem('access_token');
			persistor.purge();
			window.location.href = '/login';
		}
		return Promise.reject(error);
	}
)

export const GET = async (url, options = {}, headers = DEFAULT_HEADERS, queryParams = {}, data = {}) => {
	try {
		const urlWithParams = new URL(url);
		Object.keys(queryParams).forEach(key => urlWithParams.searchParams.append(key, queryParams[key]));

		return await axios.get(urlWithParams.toString(), {
			headers,
			data,
			...options
		});
	} catch(error) {
		throw error;
	}
}

export const POST = async (url, payload, headers = DEFAULT_HEADERS ) => {
	try {
		return await axios.post(url, payload, { headers });
	} catch(error) {
		throw error;
	}
}

export const PATCH = async (url, payload, headers = DEFAULT_HEADERS) => {
	try {
		return await axios.patch(url, payload, { headers });
	} catch(error) {
		throw error;
	}
}

export const PUT = async (url, payload, headers = DEFAULT_HEADERS) => {
	try {
		return await axios.put(url, payload, { headers });
	} catch(error) {
		throw error;
	}
}

export const DELETE = async (url) => {
	try {
		const options ={
			method: "DELETE",
			headers: DEFAULT_HEADERS
		};
		return await axios.delete(url, options);
	} catch(error) {
		throw error;
	}
}
