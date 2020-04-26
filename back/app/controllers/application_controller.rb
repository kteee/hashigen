class ApplicationController < ActionController::API

  def response_get_success(response_item)
    render status: 200, json: { data: response_item }
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
    header = request.headers['Authorization']
    @decoded_data = JsonWebToken.decode(header)
  end

end
