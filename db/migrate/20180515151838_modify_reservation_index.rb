class ModifyReservationIndex < ActiveRecord::Migration[5.1]
  def change
    remove_index :reservations, [:user_id, :start_datetime]
    add_index :reservations, [:user_id, :start_datetime]
  end
end
