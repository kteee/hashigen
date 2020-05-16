class LocationsController < ApplicationController
  def index
    locations = Location.ransack(prefecture_or_city_or_prefecture_kana_or_city_kana_cont: params[:q]).
      result.select("id", "code", "prefecture", "city").limit(10)
    get_request_response_success(locations)
  end

  def show
  end
end