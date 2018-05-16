class ChangeReservationEndDateTime < ActiveRecord::Migration[5.1]
  def change
    change_column_null :reservations, :end_datetime, false
  end
end
