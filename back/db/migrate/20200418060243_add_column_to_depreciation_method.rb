class AddColumnToDepreciationMethod < ActiveRecord::Migration[6.0]
  def up
    add_column :depreciation_methods, :display_name, :string
  end

  def down
    remove_column :depreciation_methods, :display_name, :string
  end
end
