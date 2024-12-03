type MessageProps = {
  message: { user: string; text: string };
  name: string;
};

export const Message = ({ message: { user, text }, name }: MessageProps) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="flex text-left justify-end">
      <p className="flex items-center text-gray-500  leading-[0.3px] rounded-full justify-center px-2 min-w-10">
        {trimmedName}
      </p>
      <div className="bg-gray-400 border-1 rounded-2xl py-1 px-4 text-gray-800 inline-block max-w-[80%]">
        <p className="w-full float-left break-words text-gray-100">{text}</p>
      </div>
    </div>
  ) : user === "admin" ? (
    <div className="flex text-left justify-start">
      <div className="bg-green-300 rounded-2xl py-1 px-5 text-gray-400 inline-block max-w-[80%]">
        <p className="w-full float-left break-words text-gray-800">{text}</p>
      </div>
      <p className="flex items-center  text-gray-500 leading-[0.3px] rounded-full justify-center px-4 min-w-10">
        {user}
      </p>
    </div>
  ) : (
    <div className="flex text-left justify-start">
      <div className="bg-white rounded-2xl py-1 px-5 text-white inline-block max-w-[80%]">
        <p className="w-full float-left break-words text-gray-800">{text}</p>
      </div>
      <p className="flex items-center  text-gray-500 leading-[0.3px] rounded-full justify-center px-4 min-w-10">
        {user}
      </p>
    </div>
  );
};
