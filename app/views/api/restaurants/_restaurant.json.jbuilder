json.extract! restaurant, :id, :name, :address, :description, :price_range,
  :overall_rating, :recommendation_rate
json.cuisines restaurant.cuisines.map(&:name)
