class AssetsController < ApplicationController
  before_action :validate_token

  def index
    all_assets_list = Asset.make_all_assets_list(@current_account.id)
    get_request_response_success(all_assets_list)
  end
  
  def create
    new_asset = Asset.new(
      name: params[:name],
      acquisition_date: Date.parse(params[:acquisition_date]),
      acquisition_value: params[:acquisition_value],
      asset_item_id: params[:asset_item_id],
      depreciation_method_id: params[:depreciation_method_id],
      account_id: @current_account.id,
      year_start_book_value: params[:year_start_book_value],
      depreciation_start_date:  Date.parse(params[:depreciation_start_date]),
      location_id: params[:location_id]
    )
    if new_asset.create_with_transaction
      post_request_response_success(new_asset)
    else
      response_error
    end
  end

  def show
    asset = Asset.find(params[:id])
    get_request_response_success(asset.get_detail)
  end

  def updated
  end

  def destroy
    asset = Asset.find(params[:id])
    if asset.destroy
      post_request_response_success('削除に成功しました')
    else
      response_error
    end
  end

end
