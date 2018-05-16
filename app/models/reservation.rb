# == Schema Information
#
# Table name: reservations
#
#  id             :bigint(8)        not null, primary key
#  user_id        :integer          not null
#  restaurant_id  :integer          not null
#  start_datetime :datetime         not null
#  table_size     :integer          not null
#  end_datetime   :datetime         not null
#

class Reservation < ApplicationRecord
  validates :user_id, :restaurant_id, :table_size,
    :start_datetime, :end_datetime, null: false
  validates :table_size, inclusion: { in: 1..20 }

  validate :upcoming_reservation
  validate :between_store_hours
  validate :will_not_exceed_restaurant_capacity
  validate :no_user_overlap

  before_validation :strip_timezone
  before_validation :include_end_datetime

  belongs_to :user
  belongs_to :restaurant

  def parsed_start_datetime
    start_datetime.strftime("%A, %b %-d at %-l:%M %P")
  end

  def strip_timezone
    start_datetime.change(offset: "+0000")
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

  def include_end_datetime
    self.end_datetime = self.start_datetime + 1.hour
  end

  def will_not_exceed_restaurant_capacity

    4.times do |i|
      interval = i * 15.minutes
      param1 = self.start_datetime + interval
      param2 = param1 - 1.hour

      query = ActiveRecord::Base.send(:sanitize_sql_array, [<<-SQL, param1, param2])
        SELECT SUM(reservations.table_size) AS diners
        FROM reservations
        JOIN restaurants ON restaurants.id = reservations.restaurant_id
        WHERE reservations.end_datetime > ?
        AND reservations.start_datetime > ?
      SQL

      present_diners = ActiveRecord::Base.connection.execute(query).values[0][0] || 0

      if present_diners + self.table_size > self.restaurant.capacity
        errors[:restaurant] << "is at capacity during that time"
        return
      end
    end
  end

  def no_user_overlap
    param1 = self.start_datetime - 1.hour
    param2 = self.end_datetime + 1.hour

    if Reservation.where("start_datetime > ? AND end_datetime < ?", param1, param2)
      .where("user_id = ?", user_id).exists?
      errors[:user] << "cannot have conflicting reservations"
    end
  end

end

# query = ActiveRecord::Base.send(:sanitize_sql_array, [<<-SQL, self.start_datetime, self.end_datetime])
#   SELECT reservations1.start_datetime, SUM(reservations2.table_size) AS diners
#   FROM reservations AS reservations1
#   JOIN restaurants ON restaurants.id = reservations1.restaurant_id
#   JOIN reservations AS reservations2 ON restaurants.id = reservations2.restaurant_id
#   WHERE reservations1.start_datetime >= ?
#     AND reservations1.start_datetime <= ?
#     AND reservations2.start_datetime >= (reservations1.start_datetime - INTERVAL '59 minutes')
#     AND reservations2.start_datetime <= (reservations1.start_datetime)
#   GROUP BY reservations1.start_datetime
# SQL
