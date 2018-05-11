class Api::RestaurantsController < ApplicationController

  def index
    if params[:query]
      @restaurants = Restaurant.search(params[:query])
    else
      base_zip = current_user ? current_user.zipcode : 10036
      @restaurants = Restaurant.where(zipcode: base_zip)
    end

    if @restaurants.length > 0
      render :index
    else
      render json: ["No matching restaurants found."], status: 404
    end
  end

  def show
    @restaurant = Restaurant.find_by(params[:id])
    if @restaurant
      render :show
    else
      render json: ["Restaurant does not exist!"], status: 404
    end
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    if @restaurant.save
      render :show
    else
      render json: @restaurant.errors.full_messages, status: 422
    end
  end

  def update
    @restaurant = Restaurant.find_by(params[:id])

    if @restaurant.update(restaurant_params)
      render :show
    else
      render json: @restaurant.errors.full_messages, status: 422
    end
  end

  def destroy
  end

  private
  def restaurant_params
    params.require(:restaurant).permit(:name, :address, :city, :state,
      :zipcode, :phone_number, :description, :price_range, :opening_time,
      :closing_time, :capacity)
  end
end
