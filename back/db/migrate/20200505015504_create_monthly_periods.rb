class CreateMonthlyPeriods < ActiveRecord::Migration[6.0]
  def change
    create_table :monthly_periods do |t|
      t.date :start, null: false
      t.date :end, null: false
      t.references :accounting_period, null: false, foreign_key: true
      t.timestamps
    end
  end
end