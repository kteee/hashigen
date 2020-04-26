class CreateAccountingPeriods < ActiveRecord::Migration[6.0]
  def change
    create_table :accounting_periods do |t|
      t.string  :start
      t.string  :end
      t.timestamps
    end
  end
end
