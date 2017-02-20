class Api::AnimalHeaderColorsController < ApplicationController
  def index
    @colors = AnimalHeaderColor.all
    render json: @colors
  end

  def show
    @color = AnimalHeaderColor.find(params[:id])
    render json: color
  end

  def edit
    @color = AnimalHeaderColor.find(params[:id])
  end

  def update
    @color = AnimalHeaderColor.find(params[:id])
    if @color.update(animal_header_colors_params)
      render json: @color
    end
  end

  private

  def animal_header_colors_params
    params.require(:animal_header_color).permit(:color)
  end
end
