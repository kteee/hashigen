class AssetItem < ApplicationRecord
  belongs_to :asset_group
  belongs_to :useful_life
  has_many :assets

  class << self
    def search_and_pagenate(word, page, per)
      pagenated_items = self.ransack(item_cont: word).
        result.page(page).per(per)
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
