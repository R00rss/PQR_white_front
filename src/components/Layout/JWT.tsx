import { createContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import imagen_fondo from "../../assets/fondo_login.png";
import {
  UserPublic,
  validate_session,
} from "../../services/userAdministration";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface JWTContextType {
  user_info: UserPublic | null;
  //user_image: string | null;
  set_user_info: (user_info: UserPublic | null) => void;
}
export const JWTContext = createContext<JWTContextType>({
  user_info: null,
  //user_image: null,
  set_user_info: () => {},
});

export default function JWT({ children }: { children: ReactNode }) {
  //const router = useRouter();
  const history = useNavigate();
  const [user_info, set_user_info] = useState<UserPublic | null>(null);
  //const [user_image, set_user_image] = useState<null | string>(null);

  const [flag_session, set_flag_session] = useState<Boolean | null>(null);

  useEffect(() => {
    validate_session().then((data) => {
      if (data) {
        set_user_info(data);
        console.log(data);
        set_flag_session(true);
        console.log("session valid");
      } else {
        console.log("session invalid");
        set_flag_session(false);
      }
    });
  }, []);
  useEffect(() => {
    if (flag_session == false) {
      MySwal.fire({
        title: "¡Sesion Expirada!",
        //text: "No ha rellenado todos los campos",
        icon: "info",
        confirmButtonText: "Aceptar",
        buttonsStyling: false,
        backdrop: `
        rgba(0,0,123,0.4)
        url(${imagen_fondo})
          `,
        customClass: {
          confirmButton:
            "bg-blanco text-azul rounded-2xl h-[40px] w-[100px]  border-azul",
          popup: "bg-azul text-blanco  rounded-3xl",
        },
      }).finally(() => {
        history("/");
      });
    }
  }, [flag_session]);
  return (
    <JWTContext.Provider value={{ user_info, set_user_info }}>
      {children}
    </JWTContext.Provider>
  );
}
