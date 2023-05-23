import { createContext, useEffect, useState, ReactNode } from "react";

import {
  UserPublic,
  validate_session,
} from "../../services/userAdministration";

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
  return (
    <JWTContext.Provider value={{ user_info, set_user_info }}>
      {children}
    </JWTContext.Provider>
  );
}
