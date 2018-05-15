json.extract! @reservation, :id, :user_id, :restaurant_id, :table_size
json.start_datetime @reservation.parsed_start_datetime
