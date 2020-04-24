class LoginController < ApplicationController

  def login
    secured_params = login_params
    @user = User.find_by(email: secured_params[:email])
    if @user.authenticate(secured_params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"), user_id: @user.id }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  private
    def login_params
      params.require(:login).permit(:email, :password)
    end

end
