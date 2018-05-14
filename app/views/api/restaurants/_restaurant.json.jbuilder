json.extract! restaurant, :id, :name, :address, :description, :price_range
json.cuisines restaurant.cuisines.map(&:name)
