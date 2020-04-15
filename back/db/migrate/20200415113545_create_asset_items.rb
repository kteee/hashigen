class CreateAssetItems < ActiveRecord::Migration[6.0]
  def change
    create_table :asset_items do |t|
      t.references :asset_group, foreign_key: true
      t.text :item, array: true
      t.references :useful_life, foreign_key: 
      t.timestamps
    end
  end
end