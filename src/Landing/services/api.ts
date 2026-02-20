const BASE_URL =
  import.meta.env.VITE_API_URL || "/v1";

export const api = {
  signup: async (data: { name: string; email: string; password: string }) => {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  login: async (data: { email: string; password: string }) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json();
  },
  
  getUserDetails: async (token: string, userId: string) => {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
},



  /* ✅ GET USER PROFILE */
  getUserById: async (token: string, userId: string) => {
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  },

  /* ✅ CREATE CHAT (for later) */
  createChat: async (
    token: string,
    data: { userId: string; message: string }
  ) => {
    const res = await fetch(`${BASE_URL}/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },
};