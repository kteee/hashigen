class CreateLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :locations  do |t|
      t.string :code
      t.string :prefecture
      t.string :city
      t.string :prefecture_kana
      t.string :city_kana
      t.timestamps
    end
  end
end
