class Api::RestaurantsController < ApplicationController

  def index
    if params[:query]
      city = current_user ? current_user.city : "New York City"
      @restaurants = Restaurant.search_by_query(params[:query]).where(city: city)
        .includes(:cuisines).order(:name)
    elsif params[:city]
      city = params[:city].gsub(/\+/, " ")
      @restaurants = Restaurant.where("city ILIKE ?", city)
        .includes(:cuisines).order(:name)
    end

    if @restaurants.length > 0
      render :index
    else
      render json: ["No matching restaurants found."], status: 404
    end
  end

  def show
    @restaurant = Restaurant.includes(:cuisines, reviews: :user).find_by(id: params[:id])
    if @restaurant
      render :show
    else
      render json: ["Restaurant does not exist!"], status: 404
    end
  end

  # def create
  #   @restaurant = Restaurant.new(restaurant_params)
  #   if @restaurant.save
  #     render :show
  #   else
  #     render json: @restaurant.errors.full_messages, status: 422
  #   end
  # end

  private
  def restaurant_params
    params.require(:restaurant).permit(:name, :address, :city, :state,
      :zipcode, :phone_number, :description, :price_range, :opening_time,
      :closing_time, :capacity)
  end
end
