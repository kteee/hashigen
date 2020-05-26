class UsefulLivesController < ApplicationController
  def index
    get_request_response_success(UsefulLife.all)
  end
end
