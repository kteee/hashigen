class AccountsController < ApplicationController
  before_action :validate_token

  def index

  end

  def create
    user_id = @decoded_data[:user_id]
    new_account = Account.new(name: params[:account_name], user_id: user_id)
    if new_account.save
      new_accounting_period = AccountingPeriod.new(start: params[:account_period_start], end: params[:account_period_end])
      if new_accounting_period.save
        new_account.accounting_period_id = new_accounting_period.id
        if new_account.save
          response_get_success(new_account)
        end
      end
    end
  end

  def show

  end

  def update

  end
  
  def destroy

  end

end
