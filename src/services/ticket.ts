import { get_token } from "./globals";
interface updateTicket {

    status: string;
  amount: 0;
  client_id: string;
  catalog_id: string;
  user_id: string;
  canal_id: string;
  social_id: string;

    
}

interface createTicket {
  status: string;
  amount: 0;
  client_id: string;
  catalog_id: string;
  user_id: string;
  canal_id: string;
  social_id: string;
}
export async function get_tickets(token: string | null = get_token()) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/ticket`, {
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

export async function create_ticket(
  ticket: createTicket,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ticket }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function update_ticket(
  ticket: updateTicket,
  token: string | null = get_token()
) {
  try {
    if (!token) return null;
    const res = await fetch("/api/ticket", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...ticket }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function get_tickets_by_user(token: string | null = get_token()) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/ticket_by_user`, {
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
export async function count_tickets(token: string | null = get_token()) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/count_tickets`, {
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
export async function ticket_index(token: string | null = get_token()) {
  try {
    if (!token) return null;
    const res = await fetch(`/api/ticket/index`, {
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

