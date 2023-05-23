import { useEffect, useState } from "react";
import { get_position } from "../services/cargo";

type cargo = {
  cargo_id: string;
  cargo_name: string;
  area: {
    area_name: string;
    area_id: string;
  };
};

export default function useCargo() {
  const [cargos, setCargos] = useState<cargo[]>([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [selectedCargo, setSelectedCargo] = useState<cargo>({
    cargo_id: "",
    cargo_name: "",
    area: {
      area_name: "",
      area_id: "",
    },
  });

  useEffect(() => console.log(selectedCargo), [selectedCargo]);

  function getData() {
    setloading(true);
    get_position()
      .then((response) => {
        if (response) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data: cargo[]) => {
        if (data) {
          setCargos(data);
        }
      })
      .catch((e) => {
        console.log(e);
        seterror(e);
      })
      .finally(() => setloading(false));
  }

  function getSelectedItem(id: string): cargo {
    const cargo = cargos.filter((cargo) => {
      return cargo.cargo_id === id;
    })[0];
    return cargo;
  }
  useEffect(() => {
    getData();
  }, []);

  return {
    cargos,
    setCargos,
    loading,
    error,
    getData,
    getSelectedItem,
    selectedCargo,
    setSelectedCargo,
  };
}
