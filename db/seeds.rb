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
  ["American", 1],
  ["Asian", 3],
  ["Chinese", 25],
  ["French", 45],
  ["Indian", 148],
  ["Italian", 55],
  ["Mediterranean", 70],
  ["Seafood", 83],
  ["Sushi", 177],
  ["Steakhouse", 141],
  ["Spanish", 89]
]

cuisines.each do |cuisine|
  Cuisine.create!(name: cuisine[0])
end

key = "f5ff512916012b0c654aa8adea1b2227"

cities = [
  ["New York City", 280],
  ["Los Angeles", 281],
  ["San Francisco", 306],
  ["Seattle", 279],
  ["Chicago", 292],
  ["Washington DC", 283]
]

# https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&start=0&count=100&cuisines=1

cities.each do |city|
  cuisines.each do |cuisine|
    
  end
end
