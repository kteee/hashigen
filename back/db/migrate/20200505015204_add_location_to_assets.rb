class AddLocationToAssets < ActiveRecord::Migration[6.0]
  def change
    add_reference :assets, :location, foreign_key: true
  end
end