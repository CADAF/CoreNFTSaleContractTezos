import { useState } from "react";
import { setCadafPercentage } from "../utils/wallet";

export default function SetCadafPercentage(props) {
  const [name, setName] = useState("");

  return (
    <div className="flex">
      <input
        type="text"
        name="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
      <button
        onClick={() => {
          setCadafPercentage(name);
        }}
        className="bg-red-500 px-6 py-2 rounded-sm text-xs font-semibold uppercase text-white cursor-pointer"
      >
        ChangePrice
      </button>
    </div>
  );
}
