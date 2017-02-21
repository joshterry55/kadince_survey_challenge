class Api::HeaderColorsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @colors = HeaderColor.all
    render json: @colors
  end

  def show
    @color = HeaderColor.find(params[:id])
    render json: color
  end

  def edit
    @color = HeaderColor.find(params[:id])
  end

  def update
    @color = HeaderColor.find(params[:id])
    if @color.update(header_colors_params)
      render json: @color
    end
  end

  private

  def header_colors_params
    params.require(:header_color).permit(:color)
  end
end
