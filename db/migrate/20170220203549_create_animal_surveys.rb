class CreateAnimalSurveys < ActiveRecord::Migration[5.0]
  def change
    create_table :animal_surveys do |t|
      t.string :email
      t.string :animal_type
      t.string :favorite_animal

      t.timestamps
    end
  end
end
