import { get_token } from "./globals";

interface cargo {
  cargo_id: string;
  cargo_name: string;
  area: {
    area_name: string;
    area_id: string;
  };
}

interface parameters {
  incidence_id: string;
  product_id: string;
}
export async function get_info_by_catalog(
  parameters: parameters,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/catalog/ticket`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ parameters }),
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

export async function get_catalog(token: string | null = get_token()) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/catalog`, {
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
export async function get_position_for_admin(
  token: string | null = get_token()
) {
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


interface getParameters {
  incidence_id: string;
  type_id: string;
}




export async function get_catalog_by_I_and_t(parameters: getParameters, token: string | null = get_token()) {
  
    try {
    if (!token) return null;
    const res = await fetch(`/api/catalog/ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({...parameters}),
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



///////////////// UPDATE CATALOG ///////////////////////
interface IUpdateCatalog {
  is_active: number;
  type_id: string;
  incidence_id: string;
  area_id: string;
  time_type: string;
  time: number;
  catalog_id: string;
  orq_id: string;
}
export async function update_catalog(
  catalog: IUpdateCatalog,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/catalog", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...catalog,
      }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}

////////////////////////////////////////

//////// CREATE CATALOG ///////////////////////

interface ICreateCatalog {
  is_active?: number;
  type_id: string;
  incidence_id: string;
  area_id: string;
  time_type: string;
  time: number;
}

export async function create_catalog(
  catalog: ICreateCatalog,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/catalog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...catalog }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}



/*  */
interface update_catalog_state {
  is_active: number;
  catalog_id: string;
}

export async function update_catalog_state(
  catalog: update_catalog_state,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/status/catalog", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...catalog }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
/*  */

export async function get_catalog_by_type(type_id: string, token: string | null = get_token()) {
  
  try {
  if (!token) return null;
  const res = await fetch(`/api/catalog/type/${type_id}`, {
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

export async function get_products_by_type(type_id: string, token: string | null = get_token()) {
  
  try {
  if (!token) return null;
  const res = await fetch(`/api/catalog/products/${type_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    //body: JSON.stringify({...parameters}),
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


export async function get_incidence_by_catalog(type_id: string, product_id: string, token: string | null = get_token()) {
  
  try {
  if (!token) return null;
  const res = await fetch(`/api/catalog/incidence/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({type_id,product_id}),
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



