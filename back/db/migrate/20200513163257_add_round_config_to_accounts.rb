class AddRoundConfigToAccounts < ActiveRecord::Migration[6.0]
  def change
    add_column :accounts, :round_config, :integer
  end
end
