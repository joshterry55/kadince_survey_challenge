class CreateAnimalTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :animal_types do |t|
      t.string :type

      t.timestamps
    end
  end
end
