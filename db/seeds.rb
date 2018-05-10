# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require "net/http"
require "uri"

User.destroy_all
Categorization.destroy_all
Restaurant.destroy_all
Cuisine.destroy_all

User.create!(email: "guest@guest.com", fname: "Guest", lname: "User",
  password:"password", zipcode:"10018")

cuisines = [
  ["American", "1"],
  ["Asian", "3"],
  ["Chinese", "25"],
  ["French", "45"],
  ["Indian", "148"],
  ["Italian", "55"],
  ["Mediterranean", "70"],
  ["Seafood", "83"],
  ["Sushi", "177"],
  ["Steakhouse", "141"],
  ["Spanish", "89"]
]

cuisines.each do |cuisine|
  Cuisine.create!(name: cuisine[0])
end

key = "f5ff512916012b0c654aa8adea1b2227"

cities = [
  ["New York City", "280", "New York"],
  ["Los Angeles", "281", "California"],
  ["San Francisco", "306", "California"],
  ["Seattle", "279", "Washington"],
  ["Chicago", "292", "Illinois"],
  ["Washington DC", "283", "District of Columbia"]
]

cities.each do |city|
  cuisines.each do |cuisine|
    zomato = Romato::Zomato.new(key)
    response = zomato.get_search({ entity_type: "city", entity_id: city[1], cuisines: cuisine[1] })

    response["restaurants"].each do |result|
      restaurant = result["restaurant"]

      name = restaurant["name"]
      next if Restaurant.exists?(name: name)

      unparsed_address = restaurant["location"]["address"]
      parsed_address = unparsed_address.split(", ")
      next if parsed_address.length == 1 || parsed_address.length >= 3
      address = parsed_address[0]

      city_param = city[0]
      state = city[2]
      zipcode = restaurant["location"]["zipcode"]

      phone_number = Restaurant.random_phone_number

      description = Restaurant::DESCRIPTIONS.sample
      price_range = restaurant["price_range"]
      opening_time = Restaurant::OTIMES.sample
      closing_time = Restaurant::CTIMES.sample
      capacity = Restaurant::CAPACITIES.sample

      restaurant_obj = Restaurant.new(
        name: name, address: address, city: city_param, state: state,
        zipcode: zipcode, phone_number: phone_number, description: description,
        price_range: price_range, opening_time: opening_time, closing_time: closing_time,
        capacity: capacity
      )

      restaurant_obj.save!

      cuisine_obj = Cuisine.find_by(name: cuisine[0])

      Categorization.create!(restaurant: restaurant_obj, cuisine: cuisine_obj)
    end
  end
end
