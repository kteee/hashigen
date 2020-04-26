class AccountingPeriod < ApplicationRecord
  belongs_to :account, optional: true
end
