class CreateAnimalOptions < ActiveRecord::Migration[5.0]
  def change
    create_table :animal_options do |t|
      t.string :animal_name
      t.belongs_to :animal_type, foreign_key: true

      t.timestamps
    end
  end
end
