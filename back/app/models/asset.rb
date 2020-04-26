class Asset < ApplicationRecord
  belongs_to :account
  belongs_to :asset_item
  belongs_to :depreciation_method
end
