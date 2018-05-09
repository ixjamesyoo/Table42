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
  validates :name, :address, :city, :state, :zipcode, :phone_number,
    :description, :price_range, :opening_time, :closing_time, :capacity,
    presence: true
  validates :zipcode, format: { with: /\d{5}/, message: "must be 5 digits" }
  validates :price_range, inclusion: { in: 1..4 }
  validates :phone_number, format: { with: /\d{10}/, message: "must be 10 digits"}

  validate :opening_time_before_closing_time

  has_many :categorizations
  has_many :cuisines, through: :categorizations

  DINING_INTERVAL = 60

  def opening_time_before_closing_time
    unless opening_time < closing_time
      errors[:opening] << "time must be before closing time."
    end
  end

  def parsed_phone_number
    num = phone_number
    "(#{num[0..2]}) #{num[3..5]}-#{num[6..9]}"
  end
end
