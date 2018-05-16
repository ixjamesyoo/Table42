class RenameRecommendedColumnOnReviews < ActiveRecord::Migration[5.1]
  def change
    rename_column :reviews, :recommended?, :recommended
  end
end
