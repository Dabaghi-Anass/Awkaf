import { getApiUrl } from "./lib/utils";

export const verifyUser = async () => {
	const apiUrl = getApiUrl();
	const response = await fetch(apiUrl + "/apif/me/", {
		method: "GET",
		credentials: "include", // ✅ This tells the browser to send cookies automatically
	});

	if (!response.ok) {
		throw new Error("Unauthorized");
	}

	return response.json();
};
