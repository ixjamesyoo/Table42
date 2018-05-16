class CreateReservations < ActiveRecord::Migration[5.1]
  def change
    create_table :reservations do |t|
      t.integer :user_id, null: false
      t.integer :restaurant_id, null: false
      t.datetime :start_datetime, null: false
      t.integer :table_size, null: false
    end

    add_index :reservations, :user_id
    add_index :reservations, :restaurant_id
    add_index :reservations, :start_datetime
    add_index :reservations, [:user_id, :start_datetime], unique: true
    add_index :reservations, [:restaurant_id, :start_datetime, :table_size],
      name: "index_reservation_on_restaurant_and_start_and_table" 
  end
end
