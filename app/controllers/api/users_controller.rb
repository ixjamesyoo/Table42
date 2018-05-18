class Api::UsersController < ApplicationController
  before_action :ensure_current_user_is_authorized, only: :show

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/current_user"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.includes(:reviews, :favorites, :reservations,
      :reviewed_restaurants, :favorite_restaurants, :reserved_restaurants)
      .find_by(params[:id])
    render :show
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :fname, :lname, :city)
  end

  def ensure_current_user_is_authorized
    unless current_user == User.find_by(params[:id])
      render json: ["Unauthorized attempt to access information"], status: 403
    end
  end
end
