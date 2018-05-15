Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :restaurants, except: [:new, :edit]
    resources :reservations, only: [:index, :show, :create, :destroy]
  end
end
