class RenameColumnToUsefulLives < ActiveRecord::Migration[6.0]
  def change
    change_table :useful_lives do |t|
      t.rename :two_five_zero_same_ratio_point,       :two_five_zero_same_ratio_revised
      # マイグレーションが途中失敗し以下は泣き別れになってしまった
      # t.rename :two_five_zero_same_ratio_point,             :two_five_zero_same_ratio_base
      # t.rename :two_five_zero_same_ratio_after_point, :two_five_zero_same_ratio_guaranteed 
      # t.rename :two_zero_zero_same_ratio,             :two_zero_zero_same_ratio_base
      # t.rename :two_zero_zero_same_ratio_after_point, :two_zero_zero_same_ratio_guaranteed
      # t.rename :two_zero_zero_same_ratio_point,       :two_zero_zero_same_ratio_revised 
    end
  end
end
