class User < ApplicationRecord
  belongs_to :role
  belongs_to :account
  has_secure_password
  validates :email, presence: true, uniqueness: true
end