class ApplicationController < ActionController::API

  def get_request_response_success(response_item)
    render status: 200, json: response_item
  end

  def response_post_success
    render status: 201, json: { message: 'Successfully created!'}
  end

  def response_error
    render status: 400, json: { message: 'something went wrong' }
  end

  class JsonWebToken
    SECRET_KEY = Rails.application.secrets.secret_key_base. to_s
  
    def self.encode(payload, exp = 24.hours.from_now)
      payload[:exp] = exp.to_i
      JWT.encode(payload, SECRET_KEY)
    end
  
    def self.decode(token)
      decoded = JWT.decode(token, SECRET_KEY)[0]
      HashWithIndifferentAccess.new decoded
    end
  end

  def validate_token
    begin
      header = request.headers['Authorization']
      @decoded_data = JsonWebToken.decode(header)
      @current_user = User.find(@decoded_data[:user_id])
      @current_account = @current_user.account
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { errors: e.message }, status: :unauthorized
    end
  end

end