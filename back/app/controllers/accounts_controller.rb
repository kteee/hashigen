class AccountsController < ApplicationController
  before_action :validate_token, except: :create

  def index
  end

  # テーブルとリレーションを変更したので書き直さないといけない
  def create
    new_account = Account.new(name: params[:account_name], user_id: @decoded_data[:user_id])
    if new_account.save
      new_accounting_period = AccountingPeriod.new(start: params[:account_period_start], end: params[:account_period_end])
      if new_accounting_period.save
        new_account.accounting_period_id = new_accounting_period.id
        if new_account.save
          get_request_response_success(new_account)
        end
      end
    end
  end

  def show
    account = Account.find(params[:id])
    get_request_response_success(account)
  end

  def update
    account = Account.find(@current_account.id)
    account.name = params[:name]
    account.round_config = params[:round_config]
    if account.save
      post_request_response_success(account)
    else
      response_error
    end
  end
  
  def destroy
  end

  def setting
    basic_info = @current_account.make_basic_info
    get_request_response_success(basic_info)
  end

end
