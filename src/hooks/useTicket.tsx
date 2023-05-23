import { useEffect, useState } from "react";
import { get_areas } from "../services/area";
import {
  count_tickets,
  get_tickets,
  get_tickets_by_user,
} from "../services/ticket";
import Ticket from "../pages/Ticket/NewTicket";

export type ticket = {
  status: string;
  amount: number;
  ticket_id: number;
  client: {
    client_id: string;
    client_identification: string;
    client_name: string;
    client_mail: string;
    client_phone: string;
    created_at: string;
  };
  catalog: {
    catalog_id: string;
    types: {
      type_name: string;
      is_active: number;
      type_id: string;
    };
    incidence: {
      incidence_name: string;
      incidence_id: string;
      is_active: number;
      product_id: string;
    };
    product: {
      product_name: string;
      product_id: string;
      is_active: number;
    };
    area: {
      area_name: string;
      area_id: string;
    };
    catalog_time: number;
    is_active: number;
  };
  user: {
    user_id: string;
    fullname: string;
    cargo: {
      cargo_id: string;
      cargo_name: string;
      area: {
        area_name: string;
        area_id: string;
      };
    };
    agencia: {
      agencia_name: string;
      agencia_city: string;
      agencia_id: string;
    };
    phone: string;
    is_active: number;
    user_role: {
      user_role_name: string;
      user_role_id: string;
    };
    profile_pic: string;
  };
  comment: [
    {
      comment_text: string;
      ticket_id: number;
      comment_id: string;
      created_at: string;
      user: {
        user_id: string;
        fullname: string;
        cargo: {
          cargo_id: string;
          cargo_name: string;
          area: {
            area_name: string;
            area_id: string;
          };
        };
        agencia: {
          agencia_name: string;
          agencia_city: string;
          agencia_id: string;
        };
        phone: string;
        is_active: number;
        user_role: {
          user_role_name: string;
          user_role_id: string;
        };
        profile_pic: string;
      };
    }
  ];
  files: [
    {
      file_name: string;
      file_path: string;
      ticket_id: string;
      file_id: string;
    }
  ];
  canal: {
    canal_name: string;
    canal_id: string;
  };
  social: {
    social_name: string;
    social_id: string;
  };
  created_at: string;
};

export type createTicket = {
  status: string;
  amount: number;
  client_id: string;
  catalog_id: string;
  user_id: string;
  canal_id: string;
  social_id: string;
};

export type allTickets = {
  openned_tickets: [ticket];
  in_progress_tickets: [ticket];
  closed_tickets: [ticket];
};

export default function useTicket() {
  const [inProcessTickets, setInProcessTickets] = useState<ticket[]>([]);
  const [openTickets, setOpenTickets] = useState<ticket[]>([]);
  const [closedTickets, setClosedTickets] = useState<ticket[]>([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState<ticket>({
    status: "",
    amount: 0,
    ticket_id: 0,
    client: {
      client_id: "",
      client_identification: "",
      client_name: "",
      client_mail: "",
      client_phone: "",
      created_at: "",
    },
    catalog: {
      catalog_id: "",
      types: {
        type_name: "",
        is_active: 0,
        type_id: "",
      },

      incidence: {
        incidence_name: "",
        incidence_id: "",
        is_active: 0,
        product_id: "",
      },
      product: {
        product_name: "",
        product_id: "",
        is_active: 0,
      },
      area: {
        area_name: "",
        area_id: "",
      },
      catalog_time: 0,
      is_active: 0,
    },
    user: {
      user_id: "",
      fullname: "",
      cargo: {
        cargo_id: "",
        cargo_name: "",
        area: {
          area_name: "",
          area_id: "",
        },
      },
      agencia: {
        agencia_name: "",
        agencia_city: "",
        agencia_id: "",
      },
      phone: "",
      is_active: 0,
      user_role: {
        user_role_name: "",
        user_role_id: "",
      },
      profile_pic: "",
    },
    comment: [
      {
        comment_text: "",
        ticket_id: 0,
        comment_id: "",
        created_at: "",
        user: {
          user_id: "",
          fullname: "",
          cargo: {
            cargo_id: "",
            cargo_name: "",
            area: {
              area_name: "",
              area_id: "",
            },
          },
          agencia: {
            agencia_name: "",
            agencia_city: "",
            agencia_id: "",
          },
          phone: "",
          is_active: 0,
          user_role: {
            user_role_name: "",
            user_role_id: "",
          },
          profile_pic: "",
        },
      },
    ],
    files: [
      {
        file_name: "",
        file_path: "",
        ticket_id: "",
        file_id: "",
      },
    ],
    canal: {
      canal_name: "",
      canal_id: "",
    },
    social: {
      social_name: "",
      social_id: "",
    },
    created_at: "",
  });

  useEffect(() => console.log(selectedTicket), [selectedTicket]);

  function getData() {
    setloading(true);
    get_tickets_by_user()
      .then((response) => {
        if (response) {
          //console.log(response.json());
          return response.json();
        } else {
          return null;
        }
      })
      .then((data: allTickets) => {
        if (data) {
          setOpenTickets(data.openned_tickets);

          //console.log(data);
          setInProcessTickets(data.in_progress_tickets);
          setClosedTickets(data.closed_tickets);
        }
      })
      .catch((e) => {
        console.log(e);
        seterror(e);
      })
      .finally(() => setloading(false));
  }

  function getSelectedItem(id: number, table: string): ticket {
    if (table == "Abiertos") {
      const ticket = openTickets.filter((ticket) => {
        return ticket.ticket_id === id;
      })[0];
      return ticket;
    } else if (table == "En Proceso") {
      const ticket = inProcessTickets.filter((ticket) => {
        return ticket.ticket_id === id;
      })[0];
      return ticket;
    } else if (table == "Cerrados") {
      const ticket = closedTickets.filter((ticket) => {
        return ticket.ticket_id === id;
      })[0];
      return ticket;
    } else {
      const aux: ticket = {
        status: "",
        amount: 0,
        ticket_id: 0,
        client: {
          client_id: "",
          client_identification: "",
          client_name: "",
          client_mail: "",
          client_phone: "",
          created_at: "",
        },
        catalog: {
          catalog_id: "",
          types: {
            type_name: "",
            is_active: 0,
            type_id: "",
          },

          incidence: {
            incidence_name: "",
            incidence_id: "",
            is_active: 0,
            product_id: "",
          },
          product: {
            product_name: "",
            product_id: "",
            is_active: 0,
          },
          area: {
            area_name: "",
            area_id: "",
          },
          catalog_time: 0,
          is_active: 0,
        },
        user: {
          user_id: "",
          fullname: "",
          cargo: {
            cargo_id: "",
            cargo_name: "",
            area: {
              area_name: "",
              area_id: "",
            },
          },
          agencia: {
            agencia_name: "",
            agencia_city: "",
            agencia_id: "",
          },
          phone: "",
          is_active: 0,
          user_role: {
            user_role_name: "",
            user_role_id: "",
          },
          profile_pic: "",
        },
        comment: [
          {
            comment_text: "",
            ticket_id: 0,
            comment_id: "",
            created_at: "",
            user: {
              user_id: "",
              fullname: "",
              cargo: {
                cargo_id: "",
                cargo_name: "",
                area: {
                  area_name: "",
                  area_id: "",
                },
              },
              agencia: {
                agencia_name: "",
                agencia_city: "",
                agencia_id: "",
              },
              phone: "",
              is_active: 0,
              user_role: {
                user_role_name: "",
                user_role_id: "",
              },
              profile_pic: "",
            },
          },
        ],
        files: [
          {
            file_name: "",
            file_path: "",
            ticket_id: "",
            file_id: "",
          },
        ],
        canal: {
          canal_name: "",
          canal_id: "",
        },
        social: {
          social_name: "",
          social_id: "",
        },
        created_at: "",
      };
      return aux;
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return {
    openTickets,
    inProcessTickets,
    closedTickets,
    setOpenTickets,
    setInProcessTickets,
    setClosedTickets,
    loading,
    error,
    getData,
    getSelectedItem,
    selectedTicket,
    setSelectedTicket,
  };
}
