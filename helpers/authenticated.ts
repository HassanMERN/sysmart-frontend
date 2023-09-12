export const isAuthenticated = () => {
  const token: any = localStorage.getItem("token");

  return !!token;
};
