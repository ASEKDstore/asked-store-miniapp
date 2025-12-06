export const adminFetch = async (url: string, options: RequestInit = {}) => {
  const token = import.meta.env.VITE_ADMIN_TOKEN;

  const headers = {
    "Content-Type": "application/json",
    "x-admin-token": token || "",
    ...(options.headers || {})
  };

  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
    ...options,
    headers
  });

  return res.json();
};


