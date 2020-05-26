require 'rails_helper'

RSpec.describe 'Transactions', type: :request do

  def createToken
    JsonWebToken.encode(user_id: 3)
  end
  
  let(:headers) { {Authorization: createToken } }

  describe 'INDEX api/transactions' do
    it 'returns 200 status' do
      get '/api/transactions', headers: headers
      expect(response).to have_http_status(:success)
    end
  end

end
