class AssetsController < ApplicationController
  before_action :validate_token

  def index
    all_assets_list = Asset.make_all_assets_list(@current_account.id)
    get_request_response_success(all_assets_list)
  end
  
  def create
    new_asset = Asset.new(
      name: params[:name],
      acquisition_date: params[:acquisition_date],
      acquisition_value: params[:acquisition_value],
      asset_item_id: params[:asset_item_id],
      depreciation_method_id: params[:depreciation_method_id],
      account_id: @current_account.id,
      year_start_book_value: params[:year_start_book_value],
      depreciation_start_date:  params[:depreciation_start_date]
    )
    puts new_asset
    if new_asset.save
      response_post_success
    else
      response_error
    end
  end

  def show
    asset = Asset.find(params[:id])
    depreciation = asset.depreciate
    get_request_response_success(depreciation)
  end

  def updated
  end

  def destroy
  end

end
