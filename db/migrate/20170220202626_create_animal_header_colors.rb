class CreateAnimalHeaderColors < ActiveRecord::Migration[5.0]
  def change
    create_table :animal_header_colors do |t|
      t.string :color, default: '#CBE068'

      t.timestamps
    end
  end
end
