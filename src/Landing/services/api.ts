const BASE_URL =
  import.meta.env.VITE_API_URL || "https://backend.dodraft.com/v1";

export const api = {
  /* ============================
     AUTH
  ============================ */

  signup: async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
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

  /* ============================
     USERS
  ============================ */

  getUserById: async (token: string, userId: string) => {
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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



  /* ============================
     CHATS
  ============================ */

  createChat: async (
    token: string,
    data: {
      userId: string;
      message: string;
      tone?: string;
      length?: string;
      language?: string;
      emailMode?: boolean;
      pointsToInclude?: string;
      chatId?: string;
    }
  ) => {
    const body: any = {
      userId: data.userId,
      message: data.message,
      tone: data.tone,
      length: data.length,
      language: data.language,
      emailMode: data.emailMode,
      pointsToInclude: data.pointsToInclude,
    };

    if (data.chatId) {
      body.chatId = data.chatId;
    }

    const res = await fetch(`${BASE_URL}/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    return res.json();
  },

  /* ✅ GET USER CHATS */
  getUserChats: async (token: string, userId: string) => {
    const res = await fetch(`${BASE_URL}/users/${userId}/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  },

   getChatById: async (token: string, chatId: string) => {
    const res = await fetch(`${BASE_URL}/chats/${chatId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  },

  /* ✅ DELETE CHAT */
  deleteChat: async (token: string, chatId: string) => {
    const res = await fetch(`${BASE_URL}/chats/${chatId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  },
};