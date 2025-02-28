import React, { useState, useEffect } from 'react';

export const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("accessToken"); // Get token for authentication
                const response = await fetch("http://localhost:8000/apif/admin/non-staff-users/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // Send token in headers
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                const data = await response.json();
                setUsers(data); // Store users in state
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []); // Runs only on component mount


    const handleDelete = async (userId) => {
        try {
          const token = localStorage.getItem("accessToken"); // Ensure token is stored after login
          if (!token) {
            throw new Error("No authentication token found. Please log in.");
          }
      
          const response = await fetch(`http://127.0.0.1:8000/apif/admin/delete-user/${userId}/`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${token}`, // 🔥 Include the token
              "Content-Type": "application/json",
            },
          });
      
          if (response.status === 401) {
            throw new Error("Unauthorized: Please log in again.");
          }
      
          if (!response.ok) {
            throw new Error(`Failed to delete user. Status: ${response.status}`);
          }
      
          setUsers((prevUser) => prevUser.filter((user) => user.id !== userId));
          alert("User deleted successfully!");
        } catch (error) {
          console.error("Error deleting User:", error);
        }
      };

    return (
        <div className="manage-users center">
            <h2>List of Users:</h2>
            <ul>
                {users.length > 0 ? (
                    users.map(user => (
                        <li key={user.id}>
                            <strong>{user.username}</strong> - {user.email} 
                            <button onClick={() => handleDelete(user.id)} style={{ marginLeft: "10px", color: "red" }}>
                                ❌ Delete
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </ul>
        </div>
    );
};
