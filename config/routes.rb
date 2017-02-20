Rails.application.routes.draw do

  devise_for :admins, controllers: {
    registrations: "api/registrations",
    sessions: "api/sessions",
  }
  root 'home#index'
end
