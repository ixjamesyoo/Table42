# == Schema Information
#
# Table name: categorizations
#
#  id            :bigint(8)        not null, primary key
#  restaurant_id :integer          not null
#  cuisine_id    :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Categorization < ApplicationRecord
  belongs_to :restaurant
  belongs_to :cuisine

  validates :restaurant_id, :cuisine_id, presence: true
  validates :restaurant_id, uniqueness: { scope: :cuisine_id }
end
