json.extract! restaurant, :id, :name, :address, :city, :state, :zipcode,
  :description, :price_range, :opening_time, :closing_time, :capacity
json.phone_number restaurant.parsed_phone_number
