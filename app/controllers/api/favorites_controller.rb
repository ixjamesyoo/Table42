class Api::FavoritesController < ApplicationController
  before_action :require_login
  before_action :ensure_current_user_is_authorized, only: :destroy

  def create
    @favorite = Favorite.new(favorite_params)
    @favorite.user = current_user

    if @favorite.save
      render :show
    else
      render json: @favorite.errors.full_messages
    end
  end

  def destroy
    @favorite = Favorite.find_by(params[:id])

    if @favorite.destroy
      render :show
    else
      render json: @favorite.errors.full_messages, status: 422
    end
  end

  private
  def ensure_current_user_is_authorized
    favorite = Favorite.find_by(params[:id])

    unless current_user == favorite.user
      render json: ["Unauthorized attempt to alter information"], status: 403
    end
  end

  def favorite_params
    params.require(:favorite).permit(:restaurant_id)
  end
end
