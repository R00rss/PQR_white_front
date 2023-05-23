import { useEffect, useState } from "react";
import LayoutBar from "../../components/Navigation/LayoutNavigation";
import { Link, useNavigate } from "react-router-dom";
import icono_editar_blanco from "../../assets/icono_editar_blanco.png";
import icono_borrar from "../../assets/icono_borrar.png";
import AgregarProducto from "../../components/Configuration/AgregarProducto";
import { get_product, update_product } from "../../services/product";
import useProducts from "../../hooks/useProducts";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
type product = {
  product_name: string;
  is_active: number;
  product_id: string;
};

export default function Producto() {
  // const [products, setProducts] = useState<product[]>([]);
  const {
    products,
    setProducts,
    loading,
    error,
    getData,
    getSelectedItem,
    selectedProduct,
    setSelectedProduct,
  } = useProducts();

  const history = useNavigate();
  /////////////////////////////////////////////
  // Funcion para cambiar estado
  async function editState(id: string) {
    MySwal.fire({
      html: (
        <>
          <h1 className="text-2xl text-white">Desea guardar los cambios?</h1>
        </>
      ),

      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Guardar",
      denyButtonText: "No guardar",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-green-500 text-morado font-semibold rounded-2xl h-[40px] w-[120px] px-2 mr-3 hover:bg-green-400 hover:text-azul duration-250",
        denyButton:
          "bg-red-500 text-white font-semibold rounded-2xl h-[40px] w-[140px] px-2 ml-1 border-2 border-red-400 hover:bg-red-400 hover:text-azul duration-250",
        popup: "bg-azul text-text rounded-3xl",
      },
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const selectedProduct_ = getSelectedItem(id);
        if (!selectedProduct_) return;
        const new_staus_product = {
          ...selectedProduct_,
          is_active: selectedProduct_.is_active === 1 ? 0 : 1,
        };
        //console.log(new_staus_product);

        setSelectedProduct(new_staus_product);

        const res = await update_product(new_staus_product);
        if (res != undefined) {
          console.log("Estatus del pedido: ", res.status);
          const data_ = await res.json();
          getData();
          console.log("Datos actualizados: ", data_);
        }
      } else if (result.isDenied) {
        MySwal.fire({
          title: "¡Advertencia!",
          text: "Los cambios no han sido guardados",
          icon: "warning",
          // confirmButtonText: "Aceptar",
          showConfirmButton: false,
          timer: 1500,
          buttonsStyling: false,
          customClass: {
            confirmButton: "bg-azul text-white rounded-2xl h-[40px] w-[100px]",
            popup: "bg-azul text-text rounded-3xl text-white",
          },
        });

      }
    });
  }

  async function editFunc(id: string) {
    console.log(id);
    const selectedProduct_ = getSelectedItem(id);
    setSelectedProduct(selectedProduct_);
    setBtnSelected("btnEditar");
    handleShowPopUp();
  }

  async function deleteFunc(id: string) {
    console.log(id);
    const selectedProduct_ = getSelectedItem(id);
    setSelectedProduct(selectedProduct_);
    setBtnSelected("btnEliminar");
    handleShowPopUp();
  }

  const [showPopUp, setShowPopUp] = useState(false);
  const handleShowPopUp = () => {
    setShowPopUp(true);
    //console.log(showPopUp);
  };
  const handleClosePopUp = () => setShowPopUp(false);

  const [btnSelected, setBtnSelected] = useState("btnAgregar");

  // if (loading) {
  //   return <>cargando...</>;
  // }
  // if (error) {
  //   return <>error</>;
  // }

  return (
    <LayoutBar opcionSeleccionada="administracion">
      <AgregarProducto
        showPopUp={showPopUp}
        onClosePopUp={handleClosePopUp}
        nameButton={btnSelected}
        getData={getData}
        selectedProduct={selectedProduct}
      />
      {error ? (
        <></>
      ) : (
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col w-[min(750px,90%)] max-h-[500px] rounded-md shadow-[0px_0px_15px_-3px_rgba(0,0,0,0.4)]">
            {/* Encabezado */}
            <div className="flex w-full h-[40px] items-center justify-center rounded-t-md bg-azul text-blanco">
              <p className="font-bold text-xl">Configurar Productos</p>
            </div>
            {/* Contenedor Areas */}
            <div className="flex flex-col items-center py-5 w-[100%]">
              {/* Encabezado tabla */}

              <div className="w-[95%] h-[100%] border border-salte-300 rounded-md">
                <div className=" flex flex-row w-full h-[8%] text-sm font-medium bg-slate-300">
                  <div className="flex flex-row w-[30%] overflow-hidden overflow-ellipsis justify-center">
                    <p className="text-base font-semibold">Acciones</p>
                    {/* <span className="text-red-600">*</span> */}
                  </div>
                  <div className="flex flex-row text-start w-[45%] overflow-hidden overflow-ellipsis">
                    <p className="text-base font-semibold">Producto</p>
                    {/* <span className="text-red-600">*</span> */}
                  </div>
                  <div className="flex flex-row text-start w-[25%] overflow-hidden overflow-ellipsis">
                    <p className="text-base font-semibold">Estado</p>
                    {/* <span className="text-red-600">*</span> */}
                  </div>
                </div>

                <div className="overflow-y-scroll w-[100%] max-h-[350px]">
                  {/* Cuerpo de tabla */}
                  {products.map((producto, i) => (
                    <div
                      key={producto.product_id}
                      className="flex flex-col w-full border-b border-slate-300"
                    >
                      <div className="flex flex-row p-1">
                        {/* Nombre Area */}
                        {/* botones Editar y eliminar */}
                        <div className="w-[30%]">
                          <div className="flex flex-row">
                            <div className="w-[50%] justify-end flex mr-[6%]">
                              <button
                                className="flex bg-green-500 text-white rounded  w-[40px] h-[25px] items-center justify-center duration-100 hover:scale-105 hover:bg-green-300 shadow-md "
                                onClick={() => {
                                  editFunc(producto.product_id);
                                }}
                              >
                                <img
                                  src={icono_editar_blanco}
                                  className="w-[30%] aspect-square"
                                  alt=""
                                />
                              </button>
                            </div>
                            <div className="w-[50%]">
                              <button
                                className="flex bg-red-500 text-white rounded w-[40px] h-[25px] items-center justify-center duration-100 hover:scale-105 hover:bg-red-300 shadow-md "
                                onClick={() => {
                                  deleteFunc(producto.product_id);
                                }}
                              >
                                <img
                                  src={icono_borrar}
                                  className="w-[40%] aspect-square"
                                  alt=""
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* Nombre de producto */}
                        <div className="flex justify-start pl-2 w-[50%] text-xs text-start ">
                          <p className="text-base">{producto.product_name}</p>
                        </div>
                        {/* Estado  */}
                        <div className="flex justify-start w-[20%] text-sm items-center">
                          <div
                            className={`relative inline-block w-10 rounded-full items-center justify-center h-4 cursor-pointer transition-colors duration-300 ${
                              1 === producto.is_active
                                ? "bg-green-700 justify-end "
                                : "bg-red-700 "
                            }`}
                            key={producto.product_id}
                            onClick={() => {
                              editState(producto.product_id);
                            }}
                          >
                            {producto.is_active == 1 ? (
                              <div className="transition-transform duration-300 transform translate-x-[27px] w-[25%] aspect-square rounded-full bg-white mr-[1px] translate-y-1/4"></div>
                            ) : (
                              <div className="transition-transform duration-300 transform translate-x-[0%] w-[25%] aspect-square rounded-full bg-white ml-[3px] translate-y-1/4"></div>
                            )}
                          </div>
                        </div>

                        {/* border */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center text-sm font-medium text-morado mb-5 w-[30%] mx-auto">
              <button
                className="w-[50%] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-morado hover:text-blanco hover:text-bold text-base font-semibold"
                onClick={() => {
                  setBtnSelected("btnAgregar");
                  handleShowPopUp();
                  console.log(btnSelected);
                }}
              >
                Agregar
              </button>
              <button
                className="w-[50%] h-[35px] mx-[5%] border border-morado rounded-md duration-100 hover:bg-morado hover:text-blanco hover:text-bold text-base font-semibold"
                onClick={() => history("/administracion/configuraciones")}
              >
                Salir{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </LayoutBar>
  );
}
