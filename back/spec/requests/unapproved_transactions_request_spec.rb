require 'rails_helper'
require './lib/json_web_token'

RSpec.describe 'UnapprovedTransactions', type: :request do

  def createToken
    JsonWebToken.encode(user_id: 3)
  end
  
  let(:headers) { {Authorization: createToken } }
  
  context 'INDEX /api/transactions/unapproved' do
    it 'returns 200 status' do
      get '/api/transactions/unapproved', headers: headers
      expect(response).to have_http_status(:success)
    end
  end

end
