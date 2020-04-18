class AssetItem < ApplicationRecord
  belongs_to :asset_group
  belongs_to :useful_life
  has_many :assets
end
