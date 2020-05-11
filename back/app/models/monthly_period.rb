class MonthlyPeriod < ApplicationRecord
  include MonthlyPeriodConcern

  belongs_to :accounting_period
  belongs_to :account
  has_many :transactions
end
