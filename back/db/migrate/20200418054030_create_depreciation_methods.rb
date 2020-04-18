class CreateDepreciationMethods < ActiveRecord::Migration[6.0]
  def change
    create_table :depreciation_methods do |t|
      t.string :name
      t.timestamps
    end
  end
end
