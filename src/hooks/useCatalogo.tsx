import { useEffect, useState } from "react";
import { get_catalog } from "../services/catalog";

interface ITypes {
  type_name: string;
  is_active: string;
  type_id: string;
}
interface IIncidence {
  incidence_name: string;
  incidence_id: string;
  is_active: number;
  product_id: string;
}

interface IProduct {
  product_name: string;
  product_id: string;
  is_active: number;
}
interface ICargos {}
interface IArea {
  area_name: string;
  area_id: string;
  cargos: ICargos;
}

interface Catalog {
  catalog_id: string;
  types: ITypes;
  incidence: IIncidence;
  product: IProduct;
  area: IArea;
  catalog_time: string;
  is_active: number;
}

export default function useType() {
  const [catalog, setCatalog] = useState<Catalog[]>([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [selected_Catalog, set_Selected_Catalog] = useState<Catalog>();
  // const [selectedType, setSelectedType] = useState<Type>();

  useEffect(() => console.log(selected_Catalog), [selected_Catalog]);


  function getData() {
    setloading(true);
    get_catalog()
      .then((response) => {
        if (response) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data: Catalog[]) => {
        if (data) {
          setCatalog(data);
        }
      })
      .catch((e) => {
        console.log(e);
        seterror(e);
      })
      .finally(() => setloading(false));
  }

  function getSelectedItemCatalog(id: string): Catalog {
    const catalogs = catalog.filter((catalogo) => {
      return catalogo.catalog_id === id;
    })[0];
    return catalogs;
  }

  useEffect(() => {
    getData();
  }, []);

  return {
    catalog,
    error,
    loading,
    getData,
    getSelectedItemCatalog,
    setCatalog,
    selected_Catalog,
    set_Selected_Catalog,
  };
}
