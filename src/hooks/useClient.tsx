import { useEffect, useState } from "react";
import { get_client_by_identification } from "../services/client";

type Client = {
  client_id: string;
  client_identification: string;
  client_name: string;
  client_mail: string;
  client_phone: string;
  created_at: string;
};
const DEFAULT_CLIENT_VALUE = {
  client_id: "",
  client_identification: "",
  client_name: "",
  client_mail: "",
  client_phone: "",
  created_at: "",
};

export default function useClient(client_identification: string) {
  const [identification, set_identification] = useState("");
  const [client, setClient] = useState<Client>(DEFAULT_CLIENT_VALUE);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [is_new_client, set_is_new_client] = useState(false);

  function getData(client_identification: string) {
    setloading(true);
    get_client_by_identification(client_identification)
      .then((response) => {
        if ("error" in response) {
          // if (response.error === 1) {

          // }
          set_is_new_client(true);
          setClient(DEFAULT_CLIENT_VALUE);
          return null;
        }
        return response;
      })
      .then((data) => {
        if (data) {
          set_is_new_client(false);
          setClient(data.payload);
        }
      })
      .catch((e) => {
        console.log(e);
        seterror(e);
      })
      .finally(() => setloading(false));
  }
  useEffect(() => {
    set_identification(client_identification);
  }, []);

  useEffect(() => {
    getData(identification);
  }, [identification]);

  return {
    client,
    error,
    loading,
    set_identification,
    is_new_client,
    identification,
  };
}
