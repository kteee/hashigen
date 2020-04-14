class MastersController < ApplicationController

  def useful_life
    all = UsefulLife.all
    render :json => {data: all}
  end

  def asset_type
    all = AssetType.all
    render :json => {data: all}
  end

  def asset_group
    all = AssetGroup.all
    render :json => {data: all}
  end

end
