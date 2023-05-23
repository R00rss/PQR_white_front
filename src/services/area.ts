import { get_token } from "./globals";
interface areaUpdate {
  area_id: string;
  area_name: string;
}

export async function get_areas(token: string | null = get_token()) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/area`, {
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

export async function create_area(
  area_name: string,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/area", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ area_name }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function update_area(
  area: areaUpdate,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/area", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...area }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function delete_area(
  area_id: string,
  token: string | null = get_token(),
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/area", {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ area_id }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}

