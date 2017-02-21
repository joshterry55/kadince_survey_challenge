class Api::AnimalTypesController < ApplicationController
  def index
    @animal_types = AnimalType.all
    render json: @animal_types
  end

  def show
  end

  def new
  end

  def create
    @animal_type = AnimalType.new(animal_type_params)
    if @animal_type.save
      render json: @animal_type
    end
  end

  def update
    @animal_type = AnimalType.find(params[:id])
    if @animal_type.save(animal_type_params)
      render json: @animal_type
    end
  end

  def destroy
    @animal_type = AnimalType.find(params[:id])
    @animal_type.destroy
    render json: @animal_type
  end

  private

  def animal_type_params
    params.require(:animal_type).permit(:type, :animal_type)
  end
end
