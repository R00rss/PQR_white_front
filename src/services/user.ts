import { useNavigate } from "react-router-dom";
import { get_token } from "./globals";

interface user_credentials {
  username: string;
  password: string;
}
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export function send_credentials(credentials: user_credentials) {
  return fetch(`/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
}

export async function change_password(token: string | null, password: string) {
  try {
    const res = await fetch(`/api/user/change_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
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

/* Create user */

interface userCreate {
  fullname: string;
  phone?: string;
  mail: string;
  is_active?: number;
  profile_pic?: string;
  username: string;
  is_default?: number;
  user_role_id: string;
  cargo_id: string;
  agencia_id: string;
  user_type_id: string;
}
/* Crear usuario  */
export async function create_user(
  user: userCreate,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...user }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function add_user_image(
  file: any,
  token: String | null = get_token()
) {
  if (!token) return null;
  const res = await fetch(`/api/user_image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: file,
  });
  if (res.status === 200) {
    const data = await res.json();
    return data;
  }
  return null;
}

/* Update User */
interface userUpdate {
  fullname: string;
  phone?: string;
  mail: string;
  is_active: number;
  profile_pic?: string;
  username: string;
  is_default?: number;
  user_role_id: string;
  cargo_id: string;
  agencia_id: string;
  user_type_id: string;
  user_id: string;
}

export async function update_user(
  user: userUpdate,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...user }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}

/* Get user by area */
export async function get_user_by_area(
  area_id: string,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/user/area/${area_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }}