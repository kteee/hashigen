class Transaction < ApplicationRecord
  enum status: {
    projected: 0,
    monthly_closed: 1,
    yearly_closed: 2
  }

  belongs_to :asset
  belongs_to :monthly_period
  belongs_to :transaction_type
end
