import { get_token } from "./globals";

export async function get_social(token: string | null = get_token()) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/social`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status == 200) {
      return res;
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
}