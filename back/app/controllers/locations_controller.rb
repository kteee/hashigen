class LocationsController < ApplicationController
  def index
    get_request_response_success(Location.get_10_locations_by(params[:q]))
  end

  def show
  end
end