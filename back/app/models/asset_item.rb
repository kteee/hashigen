class AssetItem < ApplicationRecord
  belongs_to :asset_group
  belongs_to :useful_life
  has_many :assets

  # scopes
  scope :filter_asset_group, -> (group_id) { eager_load(:asset_group).where(asset_groups: {id: group_id}) }

  # class methods
  class << self
    def search_and_pagenate(word, page, per, group_id)
      pagenated_items = self.ransack(item_cont: word).result.page(page).per(per)
      pagenated_items = group_id.blank? ? pagenated_items : pagenated_items.filter_asset_group(group_id)
      total_pages = pagenated_items.total_pages
      response_items = pagenated_items.map { |item| 
        {
          id: item.id,
          group: item.asset_group.name,
          item: item.item.split(','),
          useful_life: item.useful_life.year
        }
      }
      { items: response_items, pages: total_pages }
    end
  end

end
