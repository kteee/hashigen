class ApplicationController < ActionController::API

  def get_request_response_success(response_item)
    render status: 200, json: response_item
  end

  def post_request_response_success(response_item)
    render status: 201, json: response_item
  end

  def response_error(message)
    render status: 400, json: message
  end

  def authenticate
    begin
      header = request.headers['Authorization']
      @decoded_data = JsonWebToken.decode(header)
      @current_user = User.find(@decoded_data[:user_id])
      @current_account = @current_user.account
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: 401
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: 403
    end
  end

end