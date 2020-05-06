class AccountingPeriodsController < ApplicationController
  before_action :validate_token
  
  def index
    get_request_response_success(@current_account.accounting_periods)
  end

  def update
    accounting_period = AccountingPeriod.find(params[:id])
    accounting_period.update(params[:monthly_periods])
    post_request_response_success(accounting_period)
  end

end
