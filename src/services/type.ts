import { get_token } from "./globals";



interface typeUpdate {
  type_name: string;
  is_active: number;
  type_id: string;
};


export async function get_type(token: string | null = get_token()) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/type`, {
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


export async function create_type(
  type_name: string,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type_name }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function update_type(
  type: typeUpdate,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/type", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...type }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function delete_type(
  type_id: string,
  token: string | null = get_token(),
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/type", {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type_id }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
