class AddColumnsToAssets < ActiveRecord::Migration[6.0]
  def change
    add_column :assets, :unit_value, :integer
    add_column :assets, :amount, :integer
  end
end
