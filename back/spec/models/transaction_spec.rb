require 'rails_helper'

RSpec.describe 'Transaction', type: :model do
  context 'new' do
    it 'returns valid instance' do
      transaction = FactoryBot.build(:transaction)
      expect(transaction).to be_valid
    end
  end
end
