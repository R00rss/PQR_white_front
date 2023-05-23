import { useEffect, useState } from "react";
import { get_user_type } from "../services/userType";

type UserType = {
  user_type: string;
  user_type_id: string;
  user_roles: user_rol[];
};
interface user_rol {
  user_role_name: string;
  user_role_id: string;
}

export default function useUserType() {
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  // const [selectedType, setSelectedType] = useState<Type>();

  function getData() {
    setloading(true);
    get_user_type()
      .then((response) => {
        if (response) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data: UserType[]) => {
        if (data) {
          setUserTypes(data);
        }
      })
      .catch((e) => {
        console.log(e);
        seterror(e);
      })
      .finally(() => setloading(false));
  }

  useEffect(() => {
    getData();
  }, []);

  return {
    userTypes,
    error,
    loading,
    getData,
  };
}
