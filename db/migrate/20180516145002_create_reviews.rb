class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.integer :user_id, null: false
      t.integer :restaurant_id, null: false
      t.integer :overall_rating, null:false
      t.integer :food_rating, null:false
      t.integer :service_rating, null:false
      t.integer :ambience_rating, null:false
      t.integer :value_rating, null:false
      t.boolean :recommended?, null: false, default: false
      t.text :body, null: false
    end

    add_index :reviews, :user_id
    add_index :reviews, :restaurant_id
    add_index :reviews, [:user_id, :restaurant_id], unique: true
  end
end
