class AssetsController < ApplicationController

  def create
    new_asset = Asset.new(
                  name: params[:name],
                  acquisition_date: params[:acquisitionDate],
                  acquisition_value: params[:acquisitionValue],
                  asset_item_id: params[:assetItemId],
                  depreciation_method_id: params[:depreciationMethodId]
                )
    if new_asset.save
      response_success
    else
      response_error
    end
  end

end
