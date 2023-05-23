import { useEffect, useState } from "react";
import { get_areas } from "../services/area";

interface IAreas {
  area_id: string;
  area_name: string;
  cargos: ICargo[];
};

interface ICargo{
  cargo_id: string;
  area_id: string;
  cargo_name: string;
}


export default function useArea() {
  const [areas, setAreas] = useState<IAreas[]>([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [selectedArea, setSelectedArea] = useState<IAreas>({
    area_id: "",
    area_name: "",
    cargos: [],
  });

  useEffect(() => console.log(selectedArea), [selectedArea]);

  function getData() {
    setloading(true);
    get_areas()
      .then((response) => {
        if (response) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data: IAreas[]) => {
        if (data) {
          setAreas(data);
        }
      })
      .catch((e) => {
        console.log(e);
        seterror(e);
      })
      .finally(() => setloading(false));
  }

  function getSelectedItem(id: string): IAreas {
    const area = areas.filter((area) => {
      return area.area_id === id;
    })[0];
    return area;
  }

  function getItemById(id: string): IAreas | null {
    const areas_founded = areas.filter((area) => {
      return area.area_id === id;
    });
    if (areas_founded.length === 0) return null;
    return areas_founded[0];
  }
  function getItemByName(name: string): IAreas | null {
    const areas_founded = areas.filter((area) => {
      return area.area_name === name;
    });
    if (areas_founded.length === 0) return null;
    return areas_founded[0];
  }

  useEffect(() => {
    getData();
  }, []);

  return {
    areas,
    setAreas,
    loading,
    error,
    getData,
    getSelectedItem,
    selectedArea,
    setSelectedArea,
    getItemByName,
    getItemById,
  };
}

