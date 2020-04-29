class AddStatusToAccountingPeriods < ActiveRecord::Migration[6.0]
  def change
    add_column :accounting_periods, :status, :integer
  end
end
