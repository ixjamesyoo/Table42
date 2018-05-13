json.extract! restaurant, :id, :name, :address, :city, :state, :zipcode,
  :description, :opening_time, :closing_time, :capacity, :price_range
json.phone_number restaurant.parsed_phone_number
json.cuisines restaurant.cuisines.map(&:name)
