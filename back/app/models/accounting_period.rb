class AccountingPeriod < ApplicationRecord
  include AccountingPeriodConcern

  belongs_to :account
  has_many :monthly_periods

end
