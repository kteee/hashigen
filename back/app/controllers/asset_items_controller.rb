class AssetItemsController < ApplicationController
  def index
    get_request_response_success(
      AssetItem.search_and_pagenate(
        params[:q],
        params[:page],
        params[:per],
        params[:group]
      )
    )
  end
end
