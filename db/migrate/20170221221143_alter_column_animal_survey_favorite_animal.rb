class AlterColumnAnimalSurveyFavoriteAnimal < ActiveRecord::Migration[5.0]
  def change
    change_column :animal_surveys, :favorite_animal, :text, array: true, default: [], using: "(string_to_array(favorite_animal, ','))"
  end
end
