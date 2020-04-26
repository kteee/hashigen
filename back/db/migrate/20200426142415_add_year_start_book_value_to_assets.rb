class AddYearStartBookValueToAssets < ActiveRecord::Migration[6.0]
  def change
    add_column :assets, :year_start_book_value, :integer
  end
end
