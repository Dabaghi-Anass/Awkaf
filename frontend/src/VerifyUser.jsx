export const verifyUser = async (token) => {
  const response = await fetch("http://127.0.0.1:8000/apif/me/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return response.json();
};