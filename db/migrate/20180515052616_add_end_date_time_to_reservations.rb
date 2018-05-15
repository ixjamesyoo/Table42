class AddEndDateTimeToReservations < ActiveRecord::Migration[5.1]
  def change
    add_column :reservations, :end_datetime, :datetime
    add_index :reservations, [:restaurant_id, :end_datetime, :table_size],
      name: "index_reservation_on_restaurant_and_end_and_table" 
  end
end
