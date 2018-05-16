class Api::ReviewsController < ApplicationController
  before_action :require_login
  before_action :ensure_current_user_is_authorized, only: [:destroy, :update]

  def create
    @review = Review.new(review_params)
    @review.user = current_user

    if @review.save
      render :show
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def destroy
    @review = Review.find_by(id: params[:id])

    if @review.destroy
      render :show
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def update
    @review = Review.find_by(id: params[:id])

    if @review.update(review_params)
      render :show
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  private
  def review_params
    params.require(:review).permit(
      :restaurant_id, :overall_rating, :food_rating, :service_rating,
      :ambience_rating, :value_rating, :body, :recommended
    )
  end

  def ensure_current_user_is_authorized
    review = Review.find_by(params[:id])

    unless current_user == review.user
      render json: ["Unauthorized attempt to alter information"], status: 403
    end
  end
end
