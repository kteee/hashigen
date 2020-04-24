class UsersController < ApplicationController
  before_action :validate_token, except: :create

  def index
  end

  def create
    puts 'user create method called'
    @new_user = User.new(user_params)
    if @new_user.save
      response_post_success
    else
      response_error
    end
  end
  
  def show
    @user = User.find(params[:id])
    if(@decoded_data.user_id === @user.user_id)
      response_get_success(@user)
    else 
      response_error
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
