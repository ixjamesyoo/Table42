class CreateCategorizations < ActiveRecord::Migration[5.1]
  def change
    create_table :categorizations do |t|
      t.integer :restaurant_id, null: false
      t.integer :cuisine_id, null: false
    end

    add_index :categorizations, :restaurant_id
    add_index :categorizations, :cuisine_id
  end
end
