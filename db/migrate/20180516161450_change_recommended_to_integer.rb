class ChangeRecommendedToInteger < ActiveRecord::Migration[5.1]
  def change
    remove_column :reviews, :recommended
    add_column :reviews, :recommended, :integer, null: false, default: 0
  end
end
