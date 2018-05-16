# == Schema Information
#
# Table name: reviews
#
#  id              :bigint(8)        not null, primary key
#  user_id         :integer          not null
#  restaurant_id   :integer          not null
#  overall_rating  :integer          not null
#  food_rating     :integer          not null
#  service_rating  :integer          not null
#  ambience_rating :integer          not null
#  value_rating    :integer          not null
#  body            :text             not null
#  recommended     :integer          default(0), not null
#

class Review < ApplicationRecord
  validates :user_id, :restaurant_id, :overall_rating, :food_rating,
    :service_rating, :ambience_rating, :value_rating, :body, presence: true

  validates :overall_rating, :food_rating, :service_rating, :ambience_rating,
    :value_rating, inclusion: { in: 1..5 }
  validates :recommended, inclusion: { in: 0..1 }
  validates :user_id, uniqueness: { scope: :restaurant_id }

  after_initialize :no_free_recommendations

  belongs_to :user
  belongs_to :restaurant

  def no_free_recommendations
    self.recommended ||= 0
  end
end
