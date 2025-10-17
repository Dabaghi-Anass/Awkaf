export const verifyUser = async () => {
  const response = await fetch("http://127.0.0.1:8000/apif/me/", {
  method: "GET",
  credentials: "include", // ✅ This tells the browser to send cookies automatically
});

 
  if (!response.ok) {
    throw new Error("Unauthorized");
  }
  
  
  return response.json() ;
 
};