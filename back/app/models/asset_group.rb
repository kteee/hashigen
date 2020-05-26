class AssetGroup < ApplicationRecord
  belongs_to :asset_type
  has_many :asset_items

  class << self
    def get_list
      list = AssetGroup.all.map { |group| {
        value: group.id,
        label: group.name
      }}
    end
  end
end
