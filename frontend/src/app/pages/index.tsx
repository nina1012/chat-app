import { createBrowserRouter } from "react-router-dom";

export const createRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { Join } = await import("../../components/join");
        return {
          Component: Join,
        };
      },
    },
    {
      path: "/chat",
      lazy: async () => {
        const { Chat } = await import("../../components/chat");
        return { Component: Chat };
      },
    },
    {
      path: "*",
      lazy: async () => {
        const { NotFound } = await import("./not-found");
        return { Component: NotFound };
      },
    },
  ]);
