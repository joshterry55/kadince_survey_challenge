class CreateHeaderColors < ActiveRecord::Migration[5.0]
  def change
    create_table :header_colors do |t|
      t.string :color, default: '#59C4C7'

      t.timestamps
    end
  end
end
