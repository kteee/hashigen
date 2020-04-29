class ModifyColumnsToAccouuntingPeriodsAndAccounts < ActiveRecord::Migration[6.0]
  def up
    remove_reference :accounts, :accounting_period, foreign_key: true
    remove_reference :accounts, :user, foreign_key: true
    add_reference :accounting_periods, :account, foreign_key: true
    add_reference :users, :account, foreign_key: true
  end

  def down
    add_reference :accounts, :accounting_period, foreign_key: true
    add_reference :accounts, :user, foreign_key: true
  end
end