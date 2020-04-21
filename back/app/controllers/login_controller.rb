class LoginController < ApplicationController

  def login
    secured_params = login_params
    @user = User.find_by(email: secured_params[:email])
    if @user.authenticate(secured_params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M")}, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  private
    def login_params
      params.permit(:email, :password)
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

end
