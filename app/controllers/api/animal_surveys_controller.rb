class Api::AnimalSurveysController < ApplicationController
  def index
  end

  def show
  end

  def new
  end

  def create
    @animal_survey = AnimalSurvey.new(animal_survey_params)
    if @animal_survey.save
      render json: @animal_survey
    end
  end

  def edit
  end

  private

  def animal_survey_params
    params.require(:animal_survey).permit(:email, :animal_type, :favorite_animal)
  end

end