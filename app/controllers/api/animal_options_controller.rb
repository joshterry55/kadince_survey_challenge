class Api::AnimalOptionsController < ApplicationController
  def index
    @animal_options = AnimalOption.all
  end

  def show
  end

  def new
  end

  def create
    @animal_option = AnimalOption.new(animal_option_params)
    if @animal_option.save
      render json: @animal_option
    end
  end

  def update
    @animal_option = AnimalOption.find(params[:id])
    if @animal_option.save(animal_option_params)
      render json: @animal_option
    end
  end

  def destroy
    @animal_option = AnimalOption.find(params[:id])
    @animal_option.destroy
    render json: @animal_option
  end

  private

  def animal_option_params
    params.require(:animal_option).permit(:animal_name, :animal_type_id)
  end
end
