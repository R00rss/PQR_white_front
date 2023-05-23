import React from "react";
import { Link } from "react-router-dom";
import navbarbg from "../../assets/navbarbg.png";

export interface IButtonOptions {
  name: string;
  imageURL: string;
  path: string,
  options: Ioptions[];
}

interface Ioptions {
  id: string;
  path: string;
  name: string;
}
export default function Navbar({ boptions }: { boptions: IButtonOptions }) {
  return (
    <div className="flex flex-col w-full h-[70px] ">
      <img src={navbarbg} className="w-full h-full object-cover overflow-hidden" />
      <div className="absolute start-[30%] w-4/6 z-[1] border-b border-white h-[60px] ">
        <p className="text-white text-base font-bold mt-2 ">{boptions.name}</p>
        <div className="flex flex-row gap-8 mt-1">
          {boptions.options?.map((option) => {
            return (
              <Link key={option.id} to={option.path} className="text-white font-medium hover:font-bold ">
                {option.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}