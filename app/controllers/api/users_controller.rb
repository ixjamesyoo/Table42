class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/current_user"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  # will need validation to ensure current_user matches params[:id]
  # def show
  # end

  private
  def user_params
    params.require(:user).permit(:email, :password, :fname, :lname, :zipcode)
  end
end
