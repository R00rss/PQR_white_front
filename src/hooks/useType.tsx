import { useEffect, useState } from "react";
import { get_type } from "../services/type";

type type = {
  type_name: string;
  is_active: number;
  type_id: string;
};

export default function useType() {
  const [types, setTypes] = useState<type[]>([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [selectedType, setSelectedType] = useState<type>({
    type_name: "",
    is_active: 0,
    type_id: "",
  });

  // useEffect(() => console.log(selectedType), [selectedType]);

  function getData() {
    setloading(true);
    get_type()
      .then((response) => {
        if (response) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data: type[]) => {
        if (data) {
          setTypes(data);
        }
      })
      .catch((e) => {
        console.log(e);
        seterror(e);
      })
      .finally(() => setloading(false));
  }
  function getSelectedItem(id: string): type {
    const type = types.filter((type) => {
      return type.type_id === id;
    })[0];
    return type;
  }

  useEffect(() => {
    getData();
  }, []);

  return {
    types,
    setTypes,
    loading,
    error,
    getData,
    getSelectedItem,
    selectedType,
    setSelectedType,
  };
}
