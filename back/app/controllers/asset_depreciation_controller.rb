class AssetDepreciationController < ApplicationController
  before_action :validate_token

  def create
    puts params[:_json]
  end

end
