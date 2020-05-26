class ChangeToTransactions < ActiveRecord::Migration[6.0]
  def change
    rename_column :transactions, :amount, :value
    rename_column :transactions, :date, :exec_date
    add_column :transactions, :txn_date, :date
  end
end
