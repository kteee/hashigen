class AssetGroupsController < ApplicationController
  def index
    get_request_response_success(AssetGroup.get_list)
  end
end
