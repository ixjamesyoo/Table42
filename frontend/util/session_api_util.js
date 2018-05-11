export const signup = (user) => {
  delete user.passwordConfirmation;
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data: { user }
  });
};

export const login = (user) => {
  delete user.fname;
  delete user.lname;
  delete user.passwordConfirmation;
  delete user.city;
  return $.ajax({
    method: "POST",
    url: "/api/session",
    data: { user }
  });
};

export const logout = () => {
  return $.ajax({
    method: "DELETE",
    url: "/api/session"
  });
};
