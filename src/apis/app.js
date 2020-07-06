import axios from 'axios';
import { request, GraphQLClient } from 'graphql-request';
export const getTime = () => axios.get(`http://worldclockapi.com/api/json/utc/now`);

export const apiRest = async (body, url, headers) => {
	return await axios.post(`${URL_BASE_API}/${url}`, body, headers);
};

export const api = async (query, variables, token = null) => {
	if (token) {
		const client = new GraphQLClient(`${URL_API}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return client.request(query, variables);
	} else {
		return await request(`${URL_API}`, query, variables);
	}
};
