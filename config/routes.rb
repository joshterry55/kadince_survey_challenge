Rails.application.routes.draw do

  devise_for :admins, controllers: {
    registrations: "admin/registrations",
    sessions: "admin/sessions",
  }
  root 'home#index'

  namespace :api do
    resources :animal_header_colors
    resources :animal_options
    resources :animal_types
    resources :animal_surveys
    resources :color_options
    resources :color_surveys
    resources :header_colors
  end

  get '*unmatched_route', to: 'home#index'

end
