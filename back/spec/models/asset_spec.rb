require 'rails_helper'

RSpec.describe 'Asset', type: :model do
  context 'new' do
    it 'returns valid instance' do
      user = FactoryBot.build(:asset)
      expect(user).to be_valid
    end
  end
end
