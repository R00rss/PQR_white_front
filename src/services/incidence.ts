import { get_token } from "./globals";

interface IncidenceCreate{
  product_id: string;
  incidence_name: string;
}
interface  IncidenceUpdate extends IncidenceCreate {
  incidence_id: string,
  is_active: number,
  
}

export async function get_incidence(token: string | null = get_token()) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/incidence`, {
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


export async function create_incidence(
  incidence: IncidenceCreate,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/incidence", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({...incidence}),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function update_incidence(
  incidence: IncidenceUpdate,
  token: string | null = get_token()
) {
  try {
    console.log("esta incidencia estoy enviando cerdo :",incidence)
    if (!token) return null;
    const res = await fetch("/api/incidence", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({...incidence} ),
    });
    console.log(res.body)
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function delete_incidence(
  incidence_id: string,
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
      body: JSON.stringify({incidence_id }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
