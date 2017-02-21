class AddAnimalTypeToAnimalTypes < ActiveRecord::Migration[5.0]
  def change
    add_column :animal_types, :animal_type, :string
  end
end
