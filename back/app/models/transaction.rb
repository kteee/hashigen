class Transaction < ApplicationRecord
  include TransactionDepreciation

  belongs_to :asset
  belongs_to :monthly_period, optional: true
  belongs_to :transaction_type

  enum status: {
    projected: 0,
    monthly_closed: 1,
    yearly_closed: 2
  }

end
