class CreateUsefulLives < ActiveRecord::Migration[6.0]
  def change
    create_table :useful_lives do |t|
      t.integer :year
      t.float :old_same_amount
      t.float :old_same_ratio
      t.float :new_same_amount
      t.float :two_five_zero_same_ratio
      t.float :two_five_zero_same_ratio_point
      t.float :two_five_zero_same_ratio_after_point
      t.float :two_zero_zero_same_ratio
      t.float :two_zero_zero_same_ratio_point
      t.float :two_zero_zero_same_ratio_after_point
      t.timestamps
    end
  end
end
