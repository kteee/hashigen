class MonthlyPeriod < ApplicationRecord
  belongs_to :accounting_period
  has_many :transactions
end
