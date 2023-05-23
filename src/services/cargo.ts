import { get_token } from "./globals";
interface cargo  {
  
  cargo_id: string;
  cargo_name: string;
  area: {
    area_name: string;
    area_id: string;
  }
};

export async function get_position(token: string | null = get_token()) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/position`, {
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
export async function get_position_for_admin(token: string | null = get_token()) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/admin/position`, {
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
export async function create_cargo(
  area_id: string, cargo_name: string,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/position", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ area_id, cargo_name }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function update_cargo(
  area_id: string, cargo_id: string,cargo_name: string,
  
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/position", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ area_id,cargo_id,cargo_name }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function delete_cargo(
  cargo_id: string,
  token: string | null = get_token(),
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/position", {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cargo_id }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}