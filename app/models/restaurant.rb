# == Schema Information
#
# Table name: restaurants
#
#  id           :bigint(8)        not null, primary key
#  name         :string           not null
#  address      :string           not null
#  city         :string           not null
#  state        :string           not null
#  zipcode      :integer          not null
#  phone_number :string           not null
#  description  :text             not null
#  price_range  :integer          not null
#  opening_time :time             not null
#  closing_time :time             not null
#  capacity     :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Restaurant < ApplicationRecord
  include PgSearch

  validates :name, :address, :city, :state, :zipcode, :phone_number,
    :description, :price_range, :opening_time, :closing_time, :capacity,
    presence: true
  validates :zipcode, format: { with: /\d{5}/, message: "must be 5 digits" }
  validates :price_range, inclusion: { in: 1..5 }
  validates :phone_number, format: { with: /\d{10}/, message: "must be 10 digits"}

  validate :opening_time_before_closing_time

  after_initialize :cleanup_zipcode

  has_many :categorizations, dependent: :destroy
  has_many :cuisines, through: :categorizations
  has_many :reservations, dependent: :destroy
  has_many :reviews, dependent: :destroy

  pg_search_scope :search_by_query,
    against: [:name, :address, :city, :zipcode],
    associated_against: { cuisines: :name },
    using: :tsearch

  DINING_INTERVAL = 60
  CAPACITIES = [ 10, 20, 30, 40, 50, 75 ]
  OTIMES = [ "10:00:00", "11:00:00", "12:00:00", "13:00:00" ]
  CTIMES = [ "19:00:00", "20:00:00", "21:00:00", "22:00:00" ]
  DESCRIPTIONS = [
    "Upscale restaurant for refined palates.",
    "Casual ambience, perfect for family outings.",
    "Elegant atmosphere, great for special occasions.",
    "Will accommodate your noisy children. For a price.",
    "Come eat our food please.",
    "We are better than our competitors down the block."
  ]

  def self.random_phone_number
    phone_num = ""
    10.times do
      phone_num += (0..9).to_a.sample.to_s
    end
    phone_num
  end

  def opening_time_before_closing_time
    unless opening_time && closing_time && opening_time < closing_time
      errors[:opening] << "time must be before closing time."
    end
  end

  def parsed_phone_number
    num = phone_number
    "(#{num[0..2]}) #{num[3..5]}-#{num[6..9]}"
  end

  def parsed_time(arg_time)
    time = arg_time.to_s[11..18]
    first_two = time[0..1]
    if first_two.to_i > 12
      time = (first_two.to_i - 12).to_s + time[2...-3] + " PM"
    elsif first_two.to_i == 12
      time = time[0...-3] + " PM"
    elsif first_two.to_i < 10
      time = time[1...-3] + " AM"
    else
      time = time[0...-3] + " AM"
    end
    time
  end


  def cleanup_zipcode
    self.zipcode ||= 12345
  end

  def overall_rating
    self.reviews.average(:overall_rating).round(1)
  end

  def recommendation_rate
    self.reviews.average(:recommended).round(2)
  end

  def food_rating
    self.reviews.average(:food_rating).round(1)
  end

  def ambience_rating
    self.reviews.average(:ambience_rating).round(1)
  end

  def service_rating
    self.reviews.average(:service_rating).round(1)
  end

  def value_rating
    self.reviews.average(:value_rating).round(1)
  end

end
