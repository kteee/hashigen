class CurrentAccountingPeriodMonthlyPeriodsController < ApplicationController
  before_action :validate_token

  def index
    monthly_periods = AccountingPeriod.where(status: 0, account_id: @current_account.id)[0].
      monthly_periods.select('id', 'accounting_period_id', 'start', 'end')
    get_request_response_success(monthly_periods)
  end
  
  def show

  end
end
