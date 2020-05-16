class MonthlyPeriod < ApplicationRecord
  include MonthlyPeriodConcern

  belongs_to :accounting_period
  belongs_to :account
  has_many :transactions, dependent: :nullify

  class << self
    def get_monthly_period_id(account_id, date)
      monthly_periods = MonthlyPeriod.where(account_id: account_id)
      monthly_period_id = nil
      monthly_periods.each do |period|
        if period.start <= date && date <= period.end
          monthly_period_id = period.id
          break
        end
      end
      monthly_period_id
    end
  end
end
