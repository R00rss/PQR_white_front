import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { get_product } from "../services/product";
const MySwal = withReactContent(Swal);

interface I_incidences {
  incidence_name: string;
  incidence_id: string;
  is_active: number;
  product_id: string;
}

interface product {
  product_name: string;
  is_active: number;
  product_id: string;
  incidences: I_incidences[];
}

export default function useProducts() {
  const [products, setProducts] = useState<product[]>([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState<product>();

  useEffect(() => console.log(selectedProduct), [selectedProduct]);

  function getData() {
    setloading(true);
    get_product()
      .then((response) => {
        if (response) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data: product[]) => {
        if (data) {
          setProducts(data);
        }
      })
      .catch((e) => {
        console.log(e);
        seterror(e);
      })
      .finally(() => setloading(false));
  }

  function getSelectedItem(id: string): product {
    const product = products.filter((producto) => {
      return producto.product_id === id;
    })[0];
    return product;
  }
  useEffect(() => {
    getData();
  }, []);

  return {
    products,
    setProducts,
    loading,
    error,
    getData,
    getSelectedItem,
    selectedProduct,
    setSelectedProduct,
  };
}
