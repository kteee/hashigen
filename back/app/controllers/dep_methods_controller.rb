class DepMethodsController < ApplicationController
  def index
    get_request_response_success(DepreciationMethod.get_list)
  end

end
