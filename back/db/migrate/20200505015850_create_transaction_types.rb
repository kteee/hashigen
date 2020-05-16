class CreateTransactionTypes < ActiveRecord::Migration[6.0]
  def change
    create_table :transaction_types do |t|
      t.string :name
      t.string :display_name
      t.timestamps
    end
  end
end
