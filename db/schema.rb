# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180523024633) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categorizations", force: :cascade do |t|
    t.integer "restaurant_id", null: false
    t.integer "cuisine_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cuisine_id"], name: "index_categorizations_on_cuisine_id"
    t.index ["restaurant_id"], name: "index_categorizations_on_restaurant_id"
  end

  create_table "cuisines", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_cuisines_on_name", unique: true
  end

  create_table "favorites", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "restaurant_id", null: false
    t.index ["restaurant_id"], name: "index_favorites_on_restaurant_id"
    t.index ["user_id", "restaurant_id"], name: "index_favorites_on_user_id_and_restaurant_id", unique: true
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "reservations", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "restaurant_id", null: false
    t.datetime "start_datetime", null: false
    t.integer "table_size", null: false
    t.datetime "end_datetime", null: false
    t.index ["restaurant_id", "end_datetime", "table_size"], name: "index_reservation_on_restaurant_and_end_and_table"
    t.index ["restaurant_id", "start_datetime", "table_size"], name: "index_reservation_on_restaurant_and_start_and_table"
    t.index ["restaurant_id"], name: "index_reservations_on_restaurant_id"
    t.index ["start_datetime"], name: "index_reservations_on_start_datetime"
    t.index ["user_id", "start_datetime"], name: "index_reservations_on_user_id_and_start_datetime"
    t.index ["user_id"], name: "index_reservations_on_user_id"
  end

  create_table "restaurants", force: :cascade do |t|
    t.string "name", null: false
    t.string "address", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.integer "zipcode", null: false
    t.string "phone_number", null: false
    t.text "description", null: false
    t.integer "price_range", null: false
    t.time "opening_time", null: false
    t.time "closing_time", null: false
    t.integer "capacity", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "latitude"
    t.float "longitude"
    t.index ["city"], name: "index_restaurants_on_city"
    t.index ["closing_time"], name: "index_restaurants_on_closing_time"
    t.index ["name"], name: "index_restaurants_on_name", unique: true
    t.index ["opening_time"], name: "index_restaurants_on_opening_time"
    t.index ["price_range"], name: "index_restaurants_on_price_range"
    t.index ["zipcode"], name: "index_restaurants_on_zipcode"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "restaurant_id", null: false
    t.integer "overall_rating", null: false
    t.integer "food_rating", null: false
    t.integer "service_rating", null: false
    t.integer "ambience_rating", null: false
    t.integer "value_rating", null: false
    t.text "body", null: false
    t.integer "recommended", default: 0, null: false
    t.index ["restaurant_id"], name: "index_reviews_on_restaurant_id"
    t.index ["user_id", "restaurant_id"], name: "index_reviews_on_user_id_and_restaurant_id", unique: true
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "fname", null: false
    t.string "lname", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "city", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
