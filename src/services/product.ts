import { get_token } from "./globals";

interface productUpdate {
  product_name: string;
  is_active: number;
  product_id: string;
}


export async function get_product(token: string | null = get_token()) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/product`, {
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

export async function create_product(
  product_name: string,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_name }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function update_product(
  product: productUpdate,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/product", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...product }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function delete_product(
  product_id: string,
  token: string | null = get_token(),
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/product", {

      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
