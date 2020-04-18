class AssetGroup < ApplicationRecord
  belongs_to :asset_type
  has_many :asset_item
end
