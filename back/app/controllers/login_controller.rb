class LoginController < ApplicationController

  def login
    strong_params = login_params
    user = User.find_by(email: strong_params[:email])
    if user.authenticate(strong_params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      time = Time.now + 24.hours.to_i
      render status: :ok, json: { 
        token: token,
        exp: time.strftime("%m-%d-%Y %H:%M"),
        user_id: user.id,
        account_id: user.account.id
      }
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  def session
    validate_token
    if @current_user
      render status: :ok, json: {
        account_id: @current_user.account.id
      }
    end
  end

  private
    def login_params
      params.require(:login).permit(:email, :password)
    end

end
