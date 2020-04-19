class AssetsController < ApplicationController

  def list
    all_assets = Asset.all
    response = []
    all_assets.each do |asset|
      response.push({
        id: asset.id, 
        name: asset.name,
        acquisition_date: asset.acquisition_date,
        acquisition_value: asset.acquisition_value,
        useful_life: asset.asset_item.useful_life.year,
        depreciation_method: asset.depreciation_method.display_name,
        created_at: asset.created_at.strftime("%Y-%m-%d"),
        updated_at: asset.updated_at.strftime("%Y-%m-%d")
      })
    end
    puts response
    response_get_success(response)
  end
  
  def create
    new_asset = Asset.new(
                  name: params[:name],
                  acquisition_date: params[:acquisitionDate],
                  acquisition_value: params[:acquisitionValue],
                  asset_item_id: params[:assetItemId],
                  depreciation_method_id: params[:depreciationMethodId]
                )

    if new_asset.save
      response_post_success
    else
      response_error
    end
  end

  def retrieve
    asset = Asset.find(params[:id])
    dep_simulation = dep_simulation(asset)
    response = { asset: asset, depreciation: dep_simulation}
    response_get_success(response)
    # response = {
    #   id: asset.id, 
    #   name: asset.name,
    #   acquisition_date: asset.acquisition_date,
    #   acquisition_value: asset.acquisition_value,
    #   useful_life: asset.asset_item.useful_life.year,
    #   depreciation_method: asset.depreciation_method.display_name,
    #   created_at: asset.created_at.strftime("%Y-%m-%d"),
    #   updated_at: asset.updated_at.strftime("%Y-%m-%d")
    # }
    # response_get_success(response)
  end

end
