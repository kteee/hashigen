class CreateAssets < ActiveRecord::Migration[6.0]
  def change
    create_table :assets do |t|
      t.string :name
      t.date :acquisition_date
      t.integer :acquisition_value
      t.references :asset_item, foreign_key: true
      t.references :depreciation_method, foreign_key: true
      t.timestamps
    end
  end
end
