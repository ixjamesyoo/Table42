Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :restaurants, only: [:index, :show, :create] do
      resources :favorites, only: [:create]
      delete "favorites", to: "favorites#destroy"
    end
    resources :reservations, only: [:create, :destroy]
    resources :reviews, only: [:create, :update, :destroy]
  end
end
