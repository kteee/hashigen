class CurrentAccountingPeriodMonthlyPeriodsController < ApplicationController
  before_action :validate_token

  def index
    current_accounting_period = AccountingPeriod.where(status: 0, account_id: @current_account.id)[0]
    get_request_response_success(current_accounting_period.monthly_periods)
  end

  def show

  end
end
