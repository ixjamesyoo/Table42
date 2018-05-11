class ChangeZipcodeToCityOnUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :zipcode
    add_column :users, :city, :string, null: false 
  end
end
