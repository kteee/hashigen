class ChangeNullableConstraintToMonthlyPeriods < ActiveRecord::Migration[6.0]
  def up
  # change_columnの第3引数にはデータタイプを渡す必要があるらしい
    change_column :monthly_periods, :accounting_period_id, :bigint, null: true
  end

  def down
    change_column :monthly_periods, :accounting_period_id, :bigint, null: false
  end
end
