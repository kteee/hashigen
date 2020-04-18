class ApplicationController < ActionController::API
  def response_success
    render status:201, json: { status:201, message: 'Successfully created!'}
  end

  def response_error
    render status:400, json: { status:400, message: 'something went wrong' }
  end
end
