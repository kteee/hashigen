class AssetPreviewController < ApplicationController
  before_action :authenticate

  def show
    new_asset = Asset.new(
      name: params[:name],
      acquisition_date: Date.parse(params[:acquisition_date]),
      asset_item_id: params[:asset_item_id],
      depreciation_method_id: params[:depreciation_method_id],
      account_id: @current_account.id,
      year_start_book_value: params[:year_start_book_value],
      depreciation_start_date:  Date.parse(params[:depreciation_start_date]),
      location_id: params[:location_id],
      unit_value: params[:unit_value],
      amount: params[:amount],
      acquisition_value: params[:acquisition_value],
    )
    get_request_response_success(new_asset.preview_depreciation)
  end

end
