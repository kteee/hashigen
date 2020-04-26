class Account < ApplicationRecord
  has_many :accounting_periods
  has_many :users
  has_many :assets
end
