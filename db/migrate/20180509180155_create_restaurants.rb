class CreateRestaurants < ActiveRecord::Migration[5.1]
  def change
    create_table :restaurants do |t|
      t.string :name, null:false
      t.string :address, null:false
      t.string :city, null:false
      t.string :state, null:false
      t.integer :zipcode, null:false
      t.string :phone_number, null:false
      t.text :description, null: false
      t.integer :price_range, null:false
      t.time :opening_time, null:false
      t.time :closing_time, null:false
      t.integer :capacity, null:false
    end

    add_index :restaurants, :name, unique: true
    add_index :restaurants, :city
    add_index :restaurants, :zipcode
    add_index :restaurants, :price_range
    add_index :restaurants, :opening_time
    add_index :restaurants, :closing_time
  end
end
