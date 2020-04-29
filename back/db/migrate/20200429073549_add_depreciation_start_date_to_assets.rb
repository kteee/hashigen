class AddDepreciationStartDateToAssets < ActiveRecord::Migration[6.0]
  def change
    add_column :assets, :depreciation_start_date, :date
  end
end
