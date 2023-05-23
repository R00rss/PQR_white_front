import { useEffect, useState } from "react";
import { get_channel } from "../services/canal";

type Channel = {
  canal_name: string;
  canal_id: string;
};

export default function useChannel() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  // const [selectedType, setSelectedType] = useState<Type>();

  function getData() {
    setloading(true);
    get_channel()
      .then((response) => {
        if (response) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data: Channel[]) => {
        if (data) {
          setChannels(data);
        }
      })
      .catch((e) => {
        console.log(e);
        seterror(e);
      })
      .finally(() => setloading(false));
  }

  useEffect(() => {
    getData();
  }, []);

  return {
    channels,
    error,
    loading,
    getData,
  };
}
