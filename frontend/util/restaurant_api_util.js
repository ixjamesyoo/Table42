export const fetchRestaurant = (id) => {
  return $.ajax({
    method: "GET",
    url: `/api/restaurants/${id}`
  });
};

export const fetchRestaurants = () => {
  return $.ajax({
    method: "GET",
    url: "/api/restaurants"
  });
};

export const searchRestaurants = (query) => {
  // query is an object, will need to merge with hash object
  return $.ajax({
    method: "GET",
    url: "/api/restaurants",
    data: query
  });
};

export const createRestaurant = (restaurant) => {
  return $.ajax({
    method: "POST",
    url: "/api/restaurants",
    data: { restaurant }
  });
};
