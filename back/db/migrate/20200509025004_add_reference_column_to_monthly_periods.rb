class AddReferenceColumnToMonthlyPeriods < ActiveRecord::Migration[6.0]
  def up
    add_reference :monthly_periods, :account, foreign_key: true
  end

  def down
    remove_reference :monthly_periods, :account, foreign_key: true
  end
end
