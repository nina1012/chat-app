import { useState } from "react";
import { Link } from "react-router";

export const Join = () => {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  return (
    <div className="bg-pink-50 min-h-screen w-full flex justify-center items-center text-center">
      <div className="max-w-sm bg-white p-4 rounded w-full [&>div>*]:border-[1px] [&>div>*]:border-pink-100 [&>div>*]:focus:ring-1 [&>div>*]:focus:ring-pink-400 [&>div>*]:h-10 [&>div>*]:rounded [&>div>*]:px-2 [&>div>*]:w-full">
        <h1 className="font-bold text-3xl text-gray-700">Join</h1>
        <hr className="my-4 h-2" />
        <div>
          <input
            placeholder="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <input
            placeholder="Room"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
          className="bg-pink-500 hover:bg-pink-600 rounded text-white w-full h-10 inline-flex justify-center mt-4"
        >
          <button type="submit">Log in</button>
        </Link>
      </div>
      <div className="fixed bottom-0 right-0 p-4">
        Chat app by{" "}
        <a
          href="https://github.com/nina1012"
          target="_blank"
          className="text-pink-500 underline underline-offset-2"
        >
          nina1012
        </a>
      </div>
    </div>
  );
};
