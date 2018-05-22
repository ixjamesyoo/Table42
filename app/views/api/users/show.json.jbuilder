json.user do
  json.partial! "api/users/user", user: @user
end

json.restaurants do
  all_restaurants = @user.reserved_restaurants + @user.reviewed_restaurants +
    @user.favorite_restaurants

  all_restaurants.each do |restaurant|
    json.set! restaurant.id do
      json.partial! 'api/restaurants/restaurant', restaurant: restaurant
    end
  end

  json.restaurant_ids all_restaurants.map(&:id)
end

json.reservations do
  @user.reservations.each do |reservation|
    json.set! reservation.id do
      json.partial! "api/reservations/reservation", reservation: reservation
    end
  end

  json.reservation_ids @user.reservations.map(&:id)
end

json.reviews do
  @user.reviews.each do |review|
    json.set! review.id do
      json.partial! "api/reviews/review", review: review
    end
  end

  json.review_ids @user.reviews.map(&:id)
end

json.favorites @user.favorites.map(&:restaurant_id)
