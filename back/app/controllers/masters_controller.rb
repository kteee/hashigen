class MastersController < ApplicationController

  def useful_life
    all_useful_lives = UsefulLife.all
    render json: {
      status:200,
      data: all_useful_lives
    }
  end

  def asset_type
    all_types = AssetType.all
    render json: {
      status:200,
      data: all_types
    }
  end

  def asset_group
    all_groups = AssetGroup.all
    render json: {
      status:200,
      data: all_groups
    }
  end

  def asset_item_count
    items_count = AssetItem.all.count
    render json: {
      status:200,
      count: items_count
    }
  end

  def asset_item
    puts params
    pagenated_items = AssetItem.where('item LIKE ?', "%#{params[:q]}%").page(params[:page]).per(params[:per])
    total_pages = pagenated_items.total_pages
    response = []
    pagenated_items.each do |item|
      puts item.id
      response.push(
        id: item.id,
        group: item.asset_group.name,
        item: item.item.split(','),
        useful_life: item.useful_life.year
      )
    end
    render json: {
      status:200,
      items: response,
      pages: total_pages
    }
  end

  def dep_method
    all_methods = DepreciationMethod.all
    render json: {
      status:200,
      methods: all_methods
    }
  end

end