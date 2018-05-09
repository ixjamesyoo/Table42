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

ActiveRecord::Schema.define(version: 20180509184630) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categorizations", force: :cascade do |t|
    t.integer "restaurant_id", null: false
    t.integer "cuisine_id", null: false
    t.index ["cuisine_id"], name: "index_categorizations_on_cuisine_id"
    t.index ["restaurant_id"], name: "index_categorizations_on_restaurant_id"
  end

  create_table "cuisines", force: :cascade do |t|
    t.string "name", null: false
    t.index ["name"], name: "index_cuisines_on_name", unique: true
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
    t.index ["city"], name: "index_restaurants_on_city"
    t.index ["closing_time"], name: "index_restaurants_on_closing_time"
    t.index ["name"], name: "index_restaurants_on_name", unique: true
    t.index ["opening_time"], name: "index_restaurants_on_opening_time"
    t.index ["price_range"], name: "index_restaurants_on_price_range"
    t.index ["zipcode"], name: "index_restaurants_on_zipcode"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "fname", null: false
    t.string "lname", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.integer "zipcode", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
