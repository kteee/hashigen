class ChangeStartAndEndOfAccountingPeriods < ActiveRecord::Migration[6.0]
  def up
    change_column :accounting_periods, :start, :date
    change_column :accounting_periods, :end, :date
  end
  def down
    change_column :accounting_periods, :start, :string
    change_column :accounting_periods, :end, :string
  end
end
