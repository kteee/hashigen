class AddAssetTypeToAssetGroups < ActiveRecord::Migration[6.0]
  def change
    add_reference :asset_groups, :asset_type, foreign_key: true
  end
end
