class LoginController < ApplicationController

  def login
    strong_params = login_params
    @user = User.find_by(email: strong_params[:email])
    if @user.authenticate(strong_params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"), user_id: @user.id }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  def session
    validate_token
    @user_id = @decoded_data[:user_id]
    if User.find(@user_id)
      render status: 200, json: { message: 'token seems fine' }
    end
  end

  private
    def login_params
      params.require(:login).permit(:email, :password)
    end

end
