import { useEffect, useState } from "react";
import { get_social } from "../services/social";

type Social = {
  social_name: string;
  social_id: string;
};

export default function useSocial() {
  const [socials, setSocials] = useState<Social[]>([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  // const [selectedType, setSelectedType] = useState<Type>();

  function getData() {
    setloading(true);
    get_social()
      .then((response) => {
        if (response) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data: Social[]) => {
        if (data) {
          setSocials(data);
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
    socials,
    error,
    loading,
    getData,
  };
}
