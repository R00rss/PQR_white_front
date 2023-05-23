import { useEffect, useState } from "react";
import { get_incidence } from "../services/incidence";

export type incidence = {
  incidence_name: string;
  incidence_id: string;
  is_active: number;
  product: {
    product_name: string;
    product_id: string;
    is_active: number;
  };
};

export default function useIncidence() {
  const [incidences, setIncidences] = useState<incidence[]>([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [selectedIncidence, setSelectedIncidece] = useState<incidence>({
    incidence_name: "",
    incidence_id: "",
    is_active: 0,
    product: {
      product_name: "",
      product_id: "",
      is_active: 0,
    },
  });

  function getData() {
    setloading(true);
    get_incidence()
      .then((response) => {
        if (response) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data: incidence[]) => {
        if (data) {
          setIncidences(data);
        }
      })
      .catch((e) => {
        console.log(e);
        seterror(e);
      })
      .finally(() => setloading(false));
  }

  function getSelectedItem(id: string): incidence {
    const product = incidences.filter((incidence) => {
      return incidence.incidence_id === id;
    })[0];
    return product;
  }

  useEffect(() => {
    getData();
  }, []);

  return {
    incidences,
    setIncidences,
    error,
    loading,

    getData,
    getSelectedItem,
    selectedIncidence,
    setSelectedIncidece,
  };
}
