json.restaurant do
  json.partial! 'api/restaurants/restaurant', restaurant: @restaurant
  json.extract! @restaurant, :opening_time, :closing_time, :city, :state, :zipcode
  json.phone_number @restaurant.parsed_phone_number
  json.fetched true
end
