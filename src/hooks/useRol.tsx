import { useEffect, useState } from "react";
import { get_role } from "../services/user_role";


type Role = {
  user_role_name: string;
  user_role_id : string;
};

export default function useRole() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  // const [selectedType, setSelectedType] = useState<Type>();

  function getDataRole() {
    setloading(true);
    get_role()
      .then((response) => {
        if (response) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data: Role[]) => {
        if (data) {
          setRoles(data);
        }
      })
      .catch((e) => {
        console.log(e);
        seterror(e);
      })
      .finally(() => setloading(false));
  }

  useEffect(() => {
    getDataRole();
  }, []);

  return {
    roles,
    error,
    loading,
    getDataRole,
  };
}