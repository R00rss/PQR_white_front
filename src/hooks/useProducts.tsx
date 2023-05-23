import { useEffect, useState } from "react";
import { get_product } from "../services/product";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import { incidence } from "./useIncidence";

export type product = {
  product_name: string;
  is_active: number;
  product_id: string;
  incidences: [incidence];
};

export default function useProducts() {
  const [products, setProducts] = useState<product[]>([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState<product>({
    product_name: "",
    is_active: 0,
    product_id: "",
    incidences: [
      {
        incidence_name: "",
        incidence_id: "",
        is_active: 0,
        product: {
          product_name: "",
          product_id: "",
          is_active: 0,
        },
      },
    ],
  });

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
  function getItemByName(id: string): product | null {
    const product_founded = products.filter((product) => {
      return product.product_name === id;
    });
    if (product_founded.length === 0) return null;
    return product_founded[0];
  }

  return {
    products,
    setProducts,
    loading,
    error,
    getData,
    getSelectedItem,
    selectedProduct,
    setSelectedProduct,
    getItemByName,
  };
}
