class AssetsController < ApplicationController
  before_action :validate_token

  def index
    all_assets_list = Asset.make_all_assets_list(@current_account.id)
    get_request_response_success(all_assets_list)
  end
  
  def create
    new_asset = Asset.new(params)
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
