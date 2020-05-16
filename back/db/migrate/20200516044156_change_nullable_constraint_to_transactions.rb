class ChangeNullableConstraintToTransactions < ActiveRecord::Migration[6.0]
  def up
    # change_columnの第3引数にはデータタイプを渡す必要があるらしい
      change_column :transactions, :monthly_period_id, :bigint, null: true
    end
  
    def down
      change_column :transactions, :monthly_period_id, :bigint, null: false
    end
end
