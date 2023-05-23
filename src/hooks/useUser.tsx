import { useEffect, useState } from "react";
import { get_users } from "../services/userAdministration";
import { get_user_by_area } from "../services/user";

interface IArea {
  area_name: string;
  area_id: string;
}
interface ICargo {
  cargo_id: string;
  cargo_name: string;
  area: IArea;
}
interface IAgencia {
  agencia_name: string;
  agencia_city: string;
  agencia_id: string;
}
interface IUserType {
  user_type: string;
  user_type_id: string;
}
interface IUserRole {
  user_role_name: string;
  user_role_id: string;
}

interface user {
  user_id: string;
  fullname: string;
  cargo: ICargo;
  agencia: IAgencia;
  phone: string;
  is_active: number;
  user_role: IUserRole;
  profile_pic: string;
  user_type: IUserType;
  mail: string;
  username: string;
}

// type user = {
//   user_id: string;
//   fullname: string;
//   cargo: {
//     cargo_id: string;
//     cargo_name: string;
//     area: {
//       area_name: string;
//       area_id: string;
//     };
//   };
//   agencia: {
//     agencia_name: string;
//     agencia_city: string;
//     agencia_id: string;
//   };
//   phone: string;
//   is_active: number;
//   user_role: {
//     user_role_name: string;
//     user_role_id: string;
//   };
//   profile_pic: string;
//   user_type: {
//     user_type: string;
//     user_type_id: string;
//   };
//   mail: string;
//   username: string;
// };

export default function useUser() {
  const [users, setUsers] = useState<user[]>([]);
  const [users_by_area, set_users_by_area] = useState<user[]>([]);

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [selectedUser, setSelectedUser] = useState<user>({
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
    user_type: {
      user_type: "",
      user_type_id: "",
    },
    mail: "",
    username: "",
  });

  function getData() {
    setloading(true);
    get_users()
      .then((response) => {
        if (response) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data: user[]) => {
        if (data) {
          setUsers(data);
        }
      })
      .catch((e) => {
        console.log(e);
        seterror(e);
      })
      .finally(() => setloading(false));
  }

  function getSelectedItem(id: string): user {
    const user = users.filter((user) => {
      return user.user_id === id;
    })[0];
    return user;
  }
  useEffect(() => {
    getData();
  }, []);

  function get_user_by_area_function(area_id: string) {
    get_user_by_area(area_id)
      .then((response) => {
        if (response) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data: user[]) => {
        if (data) {
          set_users_by_area(data);
        }
      })
      .catch((e) => {
        console.log(e);
        seterror(e);
      })
      .finally(() => setloading(false));
  }

  useEffect(() => {
    if (selectedUser.cargo.area.area_id !== "")
      get_user_by_area_function(selectedUser.cargo.area.area_id);
  }, []);

  function getItemByArea(id: string): user | null {
    const user_founded = users_by_area.filter((user) => {
      return user.user_id === id;
    });
    if (user_founded.length === 0) return null;
    return user_founded[0];
  }
  function getItemByName(id: string): user | null {
    const product_founded = users.filter((user) => {
      return user.fullname === id;
    });
    if (product_founded.length === 0) return null;
    return product_founded[0];
  }

  return {
    users,
    setUsers,
    loading,
    error,
    getData,
    getSelectedItem,
    selectedUser,
    setSelectedUser,
    getItemByArea,
    get_user_by_area_function,
    users_by_area,
    getItemByName,
  };
}
