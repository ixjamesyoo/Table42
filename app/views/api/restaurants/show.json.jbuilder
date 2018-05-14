json.restaurant do
  json.partial! 'api/restaurants/restaurant', restaurant: @restaurant
  json.extract! @restaurant, :city, :state, :zipcode
  json.opening_time @restaurant.parsed_time(@restaurant.opening_time)
  json.closing_time @restaurant.parsed_time(@restaurant.closing_time)
  json.phone_number @restaurant.parsed_phone_number
  json.fetched true
end
