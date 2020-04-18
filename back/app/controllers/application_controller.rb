class ApplicationController < ActionController::API

  def response_get_success(response_item)
    render status: 200, json: { status: 200, data: response_item }
  end

  def response_post_success
    render status: 201, json: { status: 201, message: 'Successfully created!'}
  end

  def response_error
    render status: 400, json: { status: 400, message: 'something went wrong' }
  end
end
