class AccountingPeriodsController < ApplicationController
  before_action :validate_token
  
  def index
    get_request_response_success(@current_account.accounting_periods)
  end

  def create
    accounting_period = AccountingPeriod.new
    accounting_period.create(@current_account.id, params[:monthly_periods])
    post_request_response_success(accounting_period)
  end

  def update
    accounting_period = AccountingPeriod.find(params[:id])
    accounting_period.update(params[:monthly_periods])
    post_request_response_success(accounting_period)
  end

  def destroy
    accounting_period = AccountingPeriod.find(params[:id])
    if accounting_period.reopen_previous_year(@current_account.id)
      post_request_response_success({message: 'successfully destroied'})
    end
  end

end
