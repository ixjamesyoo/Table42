@restaurants.each do |restaurant|
  json.set! restaurant.id do
    json.partial! 'api/restaurants/restaurant', restaurant: restaurant
  end

  json.restaurantIds @restaurants.map(&:id)
end
