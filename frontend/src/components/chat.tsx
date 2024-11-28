import queryString from "query-string";
import { useEffect } from "react";
import { useLocation } from "react-router";
export const Chat = () => {
  const location = useLocation();
  useEffect(() => {
    const data = queryString.parse(location.search);
    console.log(data);
  }, [location]);
  return (
    <div>
      <h2>Chat</h2>
    </div>
  );
};
