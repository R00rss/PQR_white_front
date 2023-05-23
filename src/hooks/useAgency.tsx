import { useEffect, useState } from "react";
import { get_agency } from "../services/agencia";

type Agency = {
  agencia_name: string;
  agencia_city: string;
  agencia_id: string;
};

export default function useAgency() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);

  // useEffect(() => console.log(selectedProduct), [selectedProduct]);

  function getData() {
    setloading(true);
    get_agency()
      .then((response) => {
        if (response) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data: Agency[]) => {
        if (data) {
          setAgencies(data);
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
    agencies,
    error,
    loading,
    getData,
  };
}
