class LocationsController < ApplicationController
  def index
    puts params[:q]
    locations = Location.ransack(params[:q]).result.limit(10)
    locations.each do |location|
      puts location.city
    end
    # get_request_response_success(locations)
  end

  def show
  end
end
