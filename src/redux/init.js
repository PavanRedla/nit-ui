export const init = {
  isLoggedIn: typeof window !== "undefined" ? sessionStorage?.user : false,
  user: "",
};
