# == Schema Information
#
# Table name: reservations
#
#  id             :bigint(8)        not null, primary key
#  user_id        :integer          not null
#  restaurant_id  :integer          not null
#  start_datetime :datetime         not null
#  table_size     :integer          not null
#
class Reservation < ApplicationRecord
  validates :user_id, :restaurant_id, :table_size,
    :start_datetime, :table_size, null: false
  validates :table_size, inclusion: { in: 1..20 }
  validate :upcoming_reservation
  validate :between_store_hours

  before_validation :strip_timezone

  belongs_to :user
  belongs_to :restaurant

  def strip_timezone
    self.start_datetime.change(offset: "+0000")
  end

  def upcoming_reservation
    if start_datetime < DateTime.now.change(offset: "+0000")
      errors[:reservation] << "cannot be in the past"
    end
  end

  def between_store_hours
    unless (start_datetime <= (restaurant.closing_time - 1.hour).change(
      day: start_datetime.day, month: start_datetime.month, year:start_datetime.year
    )) && (
    start_datetime >= restaurant.opening_time.change(
      day: start_datetime.day, month: start_datetime.month, year:start_datetime.year
    ))
      errors[:reservation] << "must be during store hours"
    end
  end

  def will_not_exceed_restaurant_capacity
    competing_reservations = Reservation.where(
      "start_datetime BETWEEN ? AND ?", start_datetime - 59.minutes, start_datetime + 59.minutes
    ).where("restaurant_id = ?", restaurant_id)

    competing_reservations.any? ? true : false
    # res = self.restaurant
    # if res.reservations.find_by

  end
end
