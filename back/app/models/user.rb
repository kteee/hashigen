class User < ApplicationRecord
  #relations
  belongs_to :role
  belongs_to :account
  
  #validations
  validates :email, :password_digest, :name, :role_id, :account_id, presence: true
  validates :email, uniqueness: true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, format: { with: VALID_EMAIL_REGEX }
  has_secure_password
  validates :password_digest, length: { minimum: 8 }

end