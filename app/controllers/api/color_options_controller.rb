class Api::ColorOptionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @color_options = ColorOption.all
    render json: @color_options
  end

  def show
  end

  def new

  end

  def create
    @color_option = ColorOption.new(color_option_params)
    if @color_option.save
      render json: @color_option
    end
  end

  def edit
  end

  def update
    @color_option = ColorOption.find(params[:id])
    if @color_option.update(color_option_params)
      render json: @color_option
    end
  end

  def destroy
    @color_option = ColorOption.find(params[:id])
    @color_option.destroy
    render json: @color_option
  end

  private

  def color_option_params
    params.require(:color_option).permit(:color_name)
  end
end
