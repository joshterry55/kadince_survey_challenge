class Api::ColorSurveysController < ApplicationController
  def index
  end

  def show
  end

  def new
  end

  def create
    @color_survey = ColorSurvey.new(color_survey_params)
    if @color_suvey.save
      render json: @color_survey
    end
  end

  def edit
  end

  private

  def color_survey_params
    params.require(:color_survey).permit(:email, :color, :reason)
  end

end
