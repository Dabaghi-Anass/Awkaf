import { createContext, useContext, useState } from "react";

const ApiContext = createContext();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

/**
 * @typedef {[any, number, string|null]} ApiResponse
 * @description Tuple response format: [data, status, error]
 * - data: The response data (null if error)
 * - status: HTTP status code
 * - error: Error message if request failed (null if successful)
 */

/**
 * Provider component for API functionality with automatic token refresh
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function ApiProvider({ children }) {
	const [isLoading, setIsLoading] = useState(true);

	/**
	 * URLs that should not trigger authentication or token refresh
	 */
	const AUTH_EXCLUDED_URLS = [
		"/token/",
		"/token/verify/",
		"/admin/login/",
		"/admin/verify/",
		"/register/",
		"/verify-email/",
		"/forgot-password/",
		"/reset-password/",
	];

	/**
	 * Check if URL should be excluded from authentication
	 * @private
	 * @param {string} url - API endpoint
	 * @returns {boolean}
	 */
	const isAuthExcluded = (url) => {
		return AUTH_EXCLUDED_URLS.some((excludedUrl) =>
			url.startsWith(excludedUrl)
		);
	};

	/**
	 * Makes an HTTP request with automatic token refresh on 401
	 * @private
	 * @param {string} url - API endpoint (without base URL)
	 * @param {string} method - HTTP method
	 * @param {Object|null} body - Request body for POST/PUT/PATCH
	 * @param {Object|null} params - URL query parameters
	 * @param {boolean} isRetry - Whether this is a retry after token refresh
	 * @returns {Promise<ApiResponse>}
	 */
	const makeRequest = async (
		url,
		method,
		body = null,
		params = null,
		isRetry = false
	) => {
		const options = {
			method: method,
			headers: {},
			credentials: "include",
		};

		// Build URL with query parameters
		let fullUrl = `${baseUrl}${url}`;
		if (params) {
			const queryString = new URLSearchParams(params).toString();
			fullUrl += `?${queryString}`;
		}

		// Add body for POST/PUT/PATCH requests
		if (
			body &&
			(method.toLowerCase() === "post" ||
				method.toLowerCase() === "put" ||
				method.toLowerCase() === "patch")
		) {
			// Check if body is FormData
			if (body instanceof FormData) {
				// Don't set Content-Type header - let browser set it with boundary
				options.body = body;
			} else {
				// Regular JSON body
				options.headers["Content-Type"] = "application/json";
				options.body = JSON.stringify(body);
			}
		} else {
			// For GET, DELETE, etc.
			options.headers["Content-Type"] = "application/json";
		}

		try {
			const response = await fetch(fullUrl, options);
			const status = response.status;
			const ok = response.ok;

			// Handle empty responses (common for DELETE requests)
			let data = null;
			try {
				data = await response.json();
			} catch (e) {
				console.log(e);
				data = null;
			}

			// Handle 401 with token refresh (only for authenticated endpoints and not a retry)
			if (status === 401 && !isRetry && !isAuthExcluded(url)) {
				console.log("Token expired, attempting refresh...");
				return await refreshToken(url, method, body, params);
			}

			// Handle non-OK responses (including 401 after retry)
			if (!ok) {
				const errorMessage =
					data?.error ||
					data?.detail ||
					data?.message ||
					"Request failed";
				return [data, status, errorMessage];
			}

			// Return successful response
			return [data, status, null];
		} catch (err) {
			console.error("Network error:", err);
			return [null, 500, err.message || "Network error"];
		} finally {
			setIsLoading(false);
		}
	};
	/**
	 * Attempts to refresh the authentication token
	 * @private
	 * @param {string} originalUrl - Original request URL to retry
	 * @param {string} originalMethod - Original request method
	 * @param {Object|null} originalBody - Original request body
	 * @param {Object|null} originalParams - Original URL parameters
	 * @returns {Promise<ApiResponse>}
	 */
	const refreshToken = async (
		originalUrl,
		originalMethod,
		originalBody,
		originalParams
	) => {
		try {
			const response = await fetch(`${baseUrl}/token/refresh/`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				const data = await response.json();

				// Update access token
				if (data.access) {
					localStorage.setItem("accessToken", data.access);
				}

				// If refresh token is also renewed
				if (data.refresh) {
					localStorage.setItem("refreshToken", data.refresh);
				}

				// Retry the original request
				return await makeRequest(
					originalUrl,
					originalMethod,
					originalBody,
					originalParams,
					true
				);
			}

			// If refresh fails, clear tokens and return error
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			return [null, response.status, "Token refresh failed"];
		} catch (err) {
			console.error("Refresh failed:", err);
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			return [null, 500, "Token refresh failed"];
		}
	};

	/**
	 * Makes a GET request
	 * @param {string} url - API endpoint (without base URL)
	 * @param {Object|null} params - URL query parameters
	 * @returns {Promise<ApiResponse>} Tuple of [data, status, error]
	 * @example
	 * const [data, status, error] = await api.get('users', { page: 1, limit: 10 });
	 * if (error) {
	 *   console.error('Error:', error);
	 * } else {
	 *   console.log('Users:', data);
	 * }
	 */
	const get = (url, params = null) => {
		return makeRequest(url, "GET", null, params);
	};

	/**
	 * Makes a POST request
	 * @param {string} url - API endpoint (without base URL)
	 * @param {Object} body - Request body
	 * @param {Object|null} params - URL query parameters
	 * @returns {Promise<ApiResponse>} Tuple of [data, status, error]
	 * @example
	 * const [data, status, error] = await api.post('users', { name: 'John', email: 'john@example.com' });
	 * if (!error) {
	 *   console.log('User created:', data);
	 * }
	 */
	const post = (url, body, params = null) => {
		return makeRequest(url, "POST", body, params);
	};

	/**
	 * Makes a PUT request
	 * @param {string} url - API endpoint (without base URL)
	 * @param {Object} body - Request body
	 * @param {Object|null} params - URL query parameters
	 * @returns {Promise<ApiResponse>} Tuple of [data, status, error]
	 * @example
	 * const [data, status, error] = await api.put('users/123', { name: 'John Doe' });
	 */
	const put = (url, body, params = null) => {
		return makeRequest(url, "PUT", body, params);
	};

	/**
	 * Makes a PATCH request
	 * @param {string} url - API endpoint (without base URL)
	 * @param {Object} body - Request body
	 * @param {Object|null} params - URL query parameters
	 * @returns {Promise<ApiResponse>} Tuple of [data, status, error]
	 * @example
	 * const [data, status, error] = await api.patch('users/123', { email: 'newemail@example.com' });
	 */
	const patch = (url, body, params = null) => {
		return makeRequest(url, "PATCH", body, params);
	};

	/**
	 * Makes a DELETE request
	 * @param {string} url - API endpoint (without base URL)
	 * @param {Object|null} params - URL query parameters
	 * @returns {Promise<ApiResponse>} Tuple of [data, status, error]
	 * @example
	 * const [data, status, error] = await api.delete('users/123');
	 * if (!error) {
	 *   console.log('User deleted');
	 * }
	 */
	const deleteRequest = (url, params = null) => {
		return makeRequest(url, "DELETE", null, params);
	};

	const value = {
		get,
		post,
		put,
		patch,
		delete: deleteRequest,
		isLoading,
	};

	return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

/**
 * Hook to access API methods
 * @returns {Object} API methods (get, post, put, patch, delete) and isLoading state
 * @throws {Error} If used outside of ApiProvider
 * @example
 * const api = useApi();
 *
 * // GET request
 * const [data, status, error] = await api.get('users/123');
 *
 * // POST request with body and params
 * const [data, status, error] = await api.post(
 *   'users',
 *   { name: 'John' },
 *   { notify: true }
 * );
 *
 * // Check response
 * if (error) {
 *   console.error('Error:', error, 'Status:', status);
 * } else {
 *   console.log('Success:', data);
 * }
 */
export const useApi = () => {
	const context = useContext(ApiContext);
	if (!context) {
		throw new Error("useApi must be used within an ApiProvider");
	}
	return context;
};
