class UsersController < ApplicationController
  before_action :authenticate, except: :create

  def index
  end

  def create
    new_user = User.new(
      email: params[:email],
      password_digest: params[:password],
      name: params[:name],
      role_id: params[:role_id],
      account_id: params[:account_id]
    )
    if new_user.save
      post_request_response_success(new_user)
    else
      response_error('failed')
    end
  end
  
  def show
    user = User.find(params[:id])
    if(@current_user.id == user.id)
      get_request_response_success(@current_user)
    else 
      response_error('unauthenticated')
    end
  end

  def update
  end

  def destroy
  end

  private
    def user_params
      params.permit(:email, :password, :password_confirmation, :role_id)
    end

end
