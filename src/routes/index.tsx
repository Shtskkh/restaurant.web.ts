import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ location }) => {
    if (location.href !== "/") {
      throw redirect({
        to: location.href,
        replace: true,
      });
    }

    throw redirect({
      to: "/dashboard",
      replace: true,
    });
  },
});
