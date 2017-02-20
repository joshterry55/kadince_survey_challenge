class CreateColorOptions < ActiveRecord::Migration[5.0]
  def change
    create_table :color_options do |t|
      t.string :color_name

      t.timestamps
    end
  end
end
