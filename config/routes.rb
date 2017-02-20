Rails.application.routes.draw do

  devise_for :admins, controllers: {
    registrations: "api/registrations",
    sessions: "api/sessions",
  }
  root 'home#index'

  get '*unmatched_route', to: 'home#index'

end
