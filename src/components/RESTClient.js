import axios from 'axios';

let headers = {
	Accept: 'application/json',
}

export class RESTFulAPI {

	async coderPushDemo(n) {
		let api = 'https://dummyapi.io/data/v1/user?limit=' + n

		headers['Content-Type'] = 'application/json'
		headers['app-id'] = '623fcf75b800b233c3f94aaa'

		return this.fetchData(api, 'GET', null);
	}

	async getAge(id) {
		let api = 'https://dummyapi.io/data/v1/user/' + id

		headers['Content-Type'] = 'application/json'
		headers['app-id'] = '623fcf75b800b233c3f94aaa'

		return this.fetchData(api, 'GET', null);
	}

	////
	async fetchData(api, method = 'GET', body) {
		
		try {
			
			console.log('\n\n# # # # ' + api + '\n')
			console.log(JSON.stringify(headers) + '\n')
			console.log(JSON.stringify(body) + '\n')
			
			var config = {
				method: method,
				url: api,
				headers: headers,//{ 
				//...body.getHeaders()
				//},
				data: body,
			};

			let response = await axios(config)

			console.log(response.data)

			return response.data

		}
		catch (error) {
			
			console.log('# # # # error')
			console.log(error)
			
			if (error.response) {
				/*
				 * The request was made and the server responded with a
				 * status code that falls out of the range of 2xx
				 */

				console.log('# # # # error.response.data')
				console.log(error.response.data);
				
				//console.log(error.response.status);
				
				console.log('# # # # error.response.headers')
				console.log(error.response.headers);
			
			} else if (error.request) {
				/*
				 * The request was made but no response was received, `error.request`
				 * is an instance of XMLHttpRequest in the browser and an instance
				 * of http.ClientRequest in Node.js
				 */
				 
				console.log('# # # # error.request')
				console.log(error.request);
			
			} else {
				// Something happened in setting up the request and triggered an Error
				
				console.log('# # # # error.message')
				console.log(error.message);
			}
			
			return error.response.data//error//networkError;
		}
	}
}

export default RESTClient = new RESTFulAPI();
