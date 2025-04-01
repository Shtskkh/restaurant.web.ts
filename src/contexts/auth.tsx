export type Auth = {
  login: string;
  access_token: string;
  status: "loggedOut" | "loggedIn";
  signIn: (login: string, access_token: string) => void;
  signOut: () => void;
};

export const auth: Auth = {
  login: "",
  access_token: "",
  status: "loggedOut",
  signIn: (login: string, access_token: string) => {
    auth.login = login;
    auth.access_token = access_token;
    auth.status = "loggedIn";
  },
  signOut: () => {
    auth.login = "";
    auth.access_token = "";
    auth.status = "loggedOut";
  },
};
