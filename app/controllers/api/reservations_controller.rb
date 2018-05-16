class Api::ReservationsController < ApplicationController
  before_action :require_login
  before_action :ensure_current_user_is_authorized, only: :destroy

  def create
    @reservation = Reservation.new(reservation_params)
    @reservation.user = current_user

    if @reservation.save
      render :show
    else
      render json: @reservation.errors.full_messages, status: 422
    end
  end

  def destroy
    @reservation = Reservation.find_by(id: params[:id])

    if @reservation.destroy
      render :show
    else
      render json: @reservation.errors.full_messages, status: 422
    end
  end

  private
  def reservation_params
    params.require(:reservation).permit(:start_datetime, :table_size, :restaurant_id)
  end

  def ensure_current_user_is_authorized
    reservation = Reservation.find_by(params[:id])

    unless current_user == reservation.user
      render json: ["Unauthorized attempt to delete information"], status: 403
    end
  end
end
