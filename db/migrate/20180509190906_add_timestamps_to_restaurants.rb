class AddTimestampsToRestaurants < ActiveRecord::Migration[5.1]
  def change
    add_timestamps(:restaurants)
    add_timestamps(:categorizations)
    add_timestamps(:cuisines)
  end
end
