class AssetsController < ApplicationController
  before_action :authenticate

  def index
    get_request_response_success(Asset.get_list(@current_account.id, params))
  end
  
  def create
    new_asset = Asset.new(
      name: params[:name],
      acquisition_date: Date.parse(params[:acquisition_date]),
      asset_item_id: params[:asset_item_id],
      depreciation_method_id: params[:depreciation_method_id],
      account_id: @current_account.id,
      depreciation_start_date:  Date.parse(params[:depreciation_start_date]),
      location_id: params[:location_id],
      unit_value: params[:unit_value],
      amount: params[:amount],
      acquisition_value: params[:acquisition_value],
      year_start_book_value: params[:year_start_book_value]
    )
    if new_asset.create_with_transaction
      post_request_response_success(new_asset)
    else
      response_error(new_asset.errors.messages)
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
