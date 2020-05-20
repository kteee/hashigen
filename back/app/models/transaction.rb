class Transaction < ApplicationRecord
  # concerns
  include TransactionDepreciation

  # relations
  belongs_to :asset
  belongs_to :monthly_period, optional: true
  belongs_to :transaction_type

  # enum
  # enum status: {
  #   projected: 0,
  #   monthly_closed: 1,
  #   yearly_closed: 2
  # }

  # validations
  validates :asset_id, :monthly_period_id, :transaction_type_id,
    :amount, :status, :date, presence: true
  validates :amount, numericality: { greater_than: 0 }, if: :is_depreciation?

  # validation methods
  def is_depreciation?
    transaction_type_id == 1
  end

end
