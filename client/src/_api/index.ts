import { API_URL } from "config";

export async function client(
  endpoint: RequestInfo,
  data?: any,
  AuthToken?: string,
  options?: RequestInit
) {
  const { ...customConfig } = options ?? {};
  const headers = { "Content-Type": "application/json" };
  const config: RequestInit = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      ...headers,
      Authorization: AuthToken ? `Bearer ${AuthToken}` : "",
      ...customConfig.headers,
    },
    ...customConfig,
  };
  try {
    const response = await window.fetch(`${API_URL}/${endpoint}`, config);
    let res = await response.json();
    if (response.ok) {
      return res;
    }
    return Promise.reject(res);
  } catch (error) {
    return Promise.reject(error ? error.message : data);
  }
}
