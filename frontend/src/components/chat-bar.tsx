import { X } from "lucide-react";
import { Link } from "react-router";

export const ChatBar = ({ room }: { room: string }) => {
  return (
    <div className="[&>*]:!border-0 !border-0 flex items-center justify-between shadow-lg bg-pink-500 rounded-t-md p-2 h-14 w-full text-white">
      <div className="flex !items-center">
        <div className="size-3 m-1 rounded-full bg-green-400"></div>
        <h3>{room}</h3>
      </div>
      <div className="flex items-center justify-end ">
        <Link to="/">
          <X className="size-4" />
        </Link>
      </div>
    </div>
  );
};
