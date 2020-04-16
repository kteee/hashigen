class MastersController < ApplicationController

  def useful_life
    all_useful_lives = UsefulLife.all
    render json: {data: all_useful_lives}
  end

  def asset_type
    all_types = AssetType.all
    render json: {data: all_types}
  end

  def asset_group
    all_groups = AssetGroup.all
    render json: {data: all_groups}
  end

  def asset_item
    all_items = AssetItem.all
    all_items_response = []
    all_items.each do |item|
      all_items_response.push(
        group: item.asset_group.name,
        item: item.item.split(','),
        useful_life: item.useful_life.year
      )
    end
    render json: {items: all_items_response}
  end

end
