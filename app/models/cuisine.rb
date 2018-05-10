# == Schema Information
#
# Table name: cuisines
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Cuisine < ApplicationRecord
  has_many :categorizations, dependent: :destroy
  has_many :restaurants, through: :categorizations

  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
