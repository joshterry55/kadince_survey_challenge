class Api::AdminsController < ApplicationController
  before_action :authenticate_user!
  def info
    unless current_user
    render json: {}
    end
  end
  
  def index
  end

  def show
  end

  def new
  end

  def edit
  end
end
