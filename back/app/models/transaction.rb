class Transaction < ApplicationRecord
  # concerns
  include TransactionSummary
  include TransactionApproval

  # relations
  belongs_to :asset
  belongs_to :monthly_period, optional: true
  belongs_to :transaction_type

  # enum
  enum status: {
    unapproved: 0,
    approved: 1
  }

  # validations
  validates :asset_id, :transaction_type_id, :value,
    :status, :exec_date, :txn_date, presence: true
  validates :value, numericality: { greater_than: 0 }, if: :is_depreciation?

  # validation methods
  def is_depreciation?
    transaction_type_id == 1
  end

end
