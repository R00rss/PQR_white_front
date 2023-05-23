import { get_token } from "./globals";

export async function get_client(token: string | null = get_token()) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/client`, {
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

export async function get_client_by_identification(
  client_identification: string,
  token: string | null = get_token()
) {
  try {
    if (!token)
      return {
        error: 4, //error no token
      };
    const res = await fetch(`/api/client/${client_identification}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status == 404) {
      return {
        error: 1, //no encontrado
      };
    }
    if (res.status == 200) {
      return {
        message: "founded user",
        payload: await res.json(),
      };
    }
    return {
      error: 2, //error servidor
    };
  } catch (e) {
    console.log(e);
    return {
      error: 3, //error catch
    };
  }
}

export async function create_client(
  client_name : string,
  client_identification : string,
  client_mail : string,
  client_phone : string,
  token: string | null = get_token()
){
  try {
    if (!token) return null;
    const res = await fetch("/api/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body : JSON.stringify({client_name, client_identification, client_mail, client_phone})
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}


