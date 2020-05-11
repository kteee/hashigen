class AssetItem < ApplicationRecord
  belongs_to :asset_group
  belongs_to :useful_life
  has_many :assets

  class << self
    def search_and_pagenate(word, page, per)
      pagenated_items = self.where('item LIKE ?', "%#{word}%").page(page).per(per)
      total_pages = pagenated_items.total_pages
      response_items = []
      pagenated_items.each do |item|
        response_items.push(
          id: item.id,
          group: item.asset_group.name,
          item: item.item.split(','),
          useful_life: item.useful_life.year
        )
      end
      { items: response_items, pages: total_pages }
    end
  end

end
