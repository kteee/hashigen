class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.references :asset, null: false, foreign_key: true
      t.references :monthly_period, null: false, foreign_key: true
      t.references :transaction_type, null: false, foreign_key: true
      t.integer :amount, null: false
      t.integer :status, null: false
      t.timestamps
    end
  end
end
