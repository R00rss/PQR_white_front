import React, { useState, useEffect, createContext, useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type product = {
  product_name: string;
  is_active: number;
  product_id: string;
};

import {
  create_product,
  delete_product,
  update_product,
} from "../../services/product";
interface PopUpProductProps {
  showPopUp: boolean;
  onClosePopUp: () => void;
  nameButton: string;
  getData: Function;
  selectedProduct: product;
}
interface PopUpProps {
  showPopUp: boolean;
  onClosePopUp: () => void;
  getData: Function;
}
interface PopUpDeleteProps {
  onClosePopUp: () => void;
  getData: Function;
  selectedProduct: product;
}
interface PopUpAddProps {
  onClosePopUp: () => void;
  getData: Function;
}
interface PopUpEditProps {
  onClosePopUp: () => void;
  getData: Function;
  selectedProduct: product;
}

export default function AgregarProducto({
  showPopUp,
  onClosePopUp,
  nameButton,
  getData,
  selectedProduct,
}: PopUpProductProps) {
  const RenderComponent = () => {
    if (nameButton === "btnEditar") {
      return (
        <PopEditar
          getData={getData}
          onClosePopUp={onClosePopUp}
          selectedProduct={selectedProduct}
        />
      );
    } else if (nameButton === "btnAgregar") {
      return <PopAgregar getData={getData} onClosePopUp={onClosePopUp} />;
    } else if (nameButton === "btnEliminar") {
      return (
        <PopEliminar
          getData={getData}
          onClosePopUp={onClosePopUp}
          selectedProduct={selectedProduct}
        />
      );
    } else {
      return <></>;
    }
  };
  if (!showPopUp) return <></>;
  return (
    <div>
      <div className="flex fixed w-full h-full duration-100 bg-black/50 z-10 top-0 left-0 bottom-0 right-0 justify-center items-center">
        <RenderComponent />
      </div>
    </div>
  );
}

function PopEditar({ onClosePopUp, getData, selectedProduct }: PopUpEditProps) {
  const [product_info, setProductInfo] = useState<product>(selectedProduct);
  const editProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity()) {
      const res = await update_product(product_info);
      if (res != undefined) {
        console.log("Estatus del pedido: ", res.status);
        const data_ = await res.json();

        console.log("Datos actualizados: ", data_);

        MySwal.fire({
          title: "!Producto actualizado correctamente¡",
          //text: "No ha rellenado todos los campos",
          icon: "success",
          // confirmButtonText: "Aceptar",
          showConfirmButton: false,
          buttonsStyling: false,
          timer: 1500,
          customClass: {
            confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
            popup: "bg-azul text-text rounded-3xl text-white",
          },
        }).finally(() => {
          onClosePopUp();
          getData();
        });
      }
    }
  };
  return (
    <div className="flex flex-col items-center bg-blanco w-[min(550px,90%)] rounded-lg h-[200px] duration-200 transform ">
      <div className="bg-azul w-full h-[40px] rounded-t-md text-blanco font-semibold text-xl flex items-center justify-center">
        <p>Editar Producto</p>
      </div>

      <div className="w-[90%]">
        <form action="flex flex-col w-full" onSubmit={editProduct} noValidate>
          <div className="flex flex-col w-full">
            {/* fila 1 */}

            {/* fila 2 */}
            <div className="flex flex-row py-4 w-full">
              <div className="flex flex-row w-[75%]">
                <p className="text-base font-semibold text-morado">
                  Nombre Producto
                </p>
                {/* <span className="text-red-600">*</span> */}
              </div>
              <div className="w-[25%]">
                <p className="text-base font-medium">Estado</p>
              </div>
            </div>

            {/* fila 3 */}

            <div className="flex flex-row w-full">
              <div className="w-[75%]">
                <input
                  onChange={(event) => {
                    setProductInfo({
                      ...product_info,
                      product_name: event.target.value,
                    });
                  }}
                  value={product_info.product_name}
                  required
                  type="text"
                  className="pl-2 py-1 w-full text-sm font-light border border-azul rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]"
                />
              </div>

              {/* Estado */}

              <div className="flex justify-center items-center w-[25%]">
                <div
                  className={`relative inline-block w-10 rounded-full items-center justify-center h-4 cursor-pointer transition-colors duration-300 ${
                    1 === product_info.is_active
                      ? "bg-green-700 justify-end "
                      : "bg-red-700 "
                  }`}
                  key={product_info.product_id}
                  onClick={() => {
                    setProductInfo({
                      ...product_info,
                      is_active: product_info.is_active === 1 ? 0 : 1,
                    });
                  }}
                >
                  {product_info.is_active == 1 ? (
                    <div className="transition-transform duration-300 transform translate-x-[27px] w-[25%] aspect-square rounded-full bg-white mr-[1px] translate-y-1/4"></div>
                  ) : (
                    <div className="transition-transform duration-300 transform translate-x-[0%] w-[25%] aspect-square rounded-full bg-white ml-[3px] translate-y-1/4"></div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center text-sm font-medium text-morado pb-2 pt-5">
              <button
                type="submit"
                className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-morado hover:text-blanco"
              >
                Confirmar
              </button>
              <button
                type="button"
                className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-morado hover:text-blanco"
                onClick={onClosePopUp}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Div Contenido */}
    </div>
  );
}

interface product_info {
  product_name: string;
}

function PopAgregar({ onClosePopUp, getData }: PopUpAddProps) {
  const [product, setProduct] = useState<product_info>({
    product_name: "",
  });

  const addProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //console.log(product);
    //console.log(product.product_name);

    if (event.currentTarget.checkValidity()) {
      const res = await create_product(product.product_name);
      console.log(res);
      if (res) {
        const estado: number = res.status;
        console.log("Estatus del Pedido: ", estado);

        const data_ = await res?.json();
        console.log("Datos :", data_);

        if (res.status != 200) {
          MySwal.fire({
            title: "¡Error!",
            //text: estado,
            icon: "error",
            confirmButtonText: "Aceptar",
            buttonsStyling: false,
            customClass: {
              confirmButton:
                "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
              popup: "bg-azul text-text rounded-3xl",
            },
          });
        } else {
          MySwal.fire({
            title: "¡Producto ingresado con exito!",
            // text: "Credenciales inválidas",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            // confirmButtonText: "Aceptar",
            // buttonsStyling: false,
            customClass: {
              confirmButton:
                "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
              popup: "bg-azul text-text rounded-3xl text-white",
            },
          }).finally(() => {
            onClosePopUp();
            getData();
          });
        }
      } else {
        MySwal.fire({
          title: "¡Error!",
          text: "Undefined",
          icon: "error",
          confirmButtonText: "Aceptar",
          buttonsStyling: false,
          customClass: {
            confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
            popup: "bg-azul text-text rounded-3xl",
          },
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-blanco w-[600px] rounded-lg h-[200px]">
      <div className="bg-azul w-full h-[15%] rounded-t-md text-blanco font-semibold text-lg">
        <p>Agregar Producto</p>
      </div>
      <form
        onSubmit={addProduct}
        noValidate
        className="flex flex-col w-[70%] h-[85%]"
      >
        {/* Div Contenido */}

        <div className=" ">
          {/* fila 1 */}

          {/* fila 2 */}
          <div className="flex flex-row py-4">
            <p className="text-base font-semibold text-morado">
              Nuevo Producto
            </p>
            {/* <span className="text-red-600">*</span> */}
          </div>

          {/* fila 3 */}
          <div>
            <input
              onChange={(event) => {
                setProduct({
                  ...product,
                  product_name: event.target.value,
                });
              }}
              value={product.product_name}
              required
              type="text"
              className="w-full border border-azul rounded focus:outline-none focus:ring-1 focus:ring-blue-600 focus:shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)] ps-2"
            />
          </div>

          <div className="flex justify-center text-sm font-medium text-morado pb-2 pt-5">
            <button
              type="submit"
              className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-green-400 hover:text-morado hover:border-green-400 hover:font-bold hover:text-base"
            >
              Confirmar
            </button>
            <button
              type="button"
              className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-red-400 hover:text-morado hover:border-red-400 hover:font-bold hover:text-base"
              onClick={onClosePopUp}
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
function PopEliminar({
  onClosePopUp,
  getData,
  selectedProduct,
}: PopUpDeleteProps) {
  const [product_info, setProductInfo] = useState<product>(selectedProduct);
  const deleteProduct = async () => {
    const res = await delete_product(product_info.product_id);
    if (res != undefined) {
      console.log("Estatus del pedido: ", res.status);
      const data_ = await res.json();

      console.log("Datos actualizados: ", data_);

      MySwal.fire({
        title: "¡ Producto Eliminado correctamente !",
        //text: "No ha rellenado todos los campos",
        icon: "success",
        // confirmButtonText: "Aceptar",
        showConfirmButton: false,
        buttonsStyling: false,
        timer: 1500,
        customClass: {
          confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
          popup: "bg-azul text-text rounded-3xl text-white",
        },
      }).finally(() => {
        onClosePopUp();
        getData();
      });
    }
  };

  return (
    <div className="flex flex-col items-center bg-blanco w-[600px] rounded-lg h-[200px]">
      <div className="bg-azul w-full h-[15%] rounded-t-md text-blanco font-semibold text-lg">
        <p>Eliminar Producto</p>
      </div>
      {/* Div Contenido */}
      <div className=" flex flex-col w-[70%] h-[85%]">
        {/* fila 1 */}

        {/* fila 2 */}
        <div className="flex flex-row py-4">
          <p className="text-2xl font-medium">
            Esta seguro que desea eliminar el Producto ?
          </p>
        </div>

        {/* fila 3 */}

        <div className="flex justify-center text-sm font-medium text-morado pb-2 pt-5">
          <button
            className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-green-400 hover:text-morado hover:border-green-400 hover:font-bold hover:text-base"
            onClick={() => {
              deleteProduct();
            }}
          >
            Confirmar
          </button>
          <button
            className="w-[90px] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-red-400  hover:text-morado hover:border-red-400 hover:font-bold hover:text-base"
            onClick={onClosePopUp}
          >
            Cancelar{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
