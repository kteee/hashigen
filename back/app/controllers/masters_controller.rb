class MastersController < ApplicationController
  def useful_life
    all_useful_lives = UsefulLife.all
    get_request_response_success(all_useful_lives)
  end

  def asset_type
    all_types = AssetType.all
    render status: 200, json: { data: all_types }
  end

  def asset_item_count
    items_count = AssetItem.all.count
    render status: 200, json: { count: items_count }
  end

end