class CreateColorSurveys < ActiveRecord::Migration[5.0]
  def change
    create_table :color_surveys do |t|
      t.string :email
      t.string :color
      t.text :reason

      t.timestamps
    end
  end
end
