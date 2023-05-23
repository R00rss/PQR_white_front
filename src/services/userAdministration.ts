import { get_token } from "./globals";

//TODO actualizar interface UserPublic



export interface UserPublic {
  agencia: string,
  area: string,
  cargo: string,
  exp: number,
  fullname: string,
  is_active: number,
  mail: string,
  profile_pic: string,
  user_id: string,
  user_role: string,
  user_type: string,
  username: string,
}

export async function get_users(token: string | null = get_token()) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/user`, {
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
export async function get_user_by_id(
  user_id: string,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/user/${user_id}`, {
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
export async function validate_session(token: string | null = get_token()) {
  try {
    const res = await fetch(`/api/validate_token`, {
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
  }
}

// export async function create_user(
//   fullname: string,
//   username: string,
//   mail: string,
//   user_role: { user_rol_name: string },
//   cargo: { cargo_name: string,  },
// );

