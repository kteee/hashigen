class AssetGroupsController < ApplicationController
  def index
    get_request_response_success(AssetGroup.all)
  end
end
