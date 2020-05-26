require 'rails_helper'

RSpec.describe "Users", type: :request do

  def createToken(id)
    JsonWebToken.encode(user_id: id)
  end

  def setHeaders(id = 3)
    { Authorization: createToken(id) }
  end
  
  let(:new_user) { FactoryBot.create(:user) }

  let(:params) {{
    email: 'keitamukaijima@gmail.com',
    password: 'aikotoba',
    name: 'Mugi',
    role_id: 1,
    account_id: 1
  }}
  
  context 'INDEX /api/users' do
    it 'returns 200 status' do
      get '/api/users', headers: setHeaders
      expect(response).to have_http_status(:success)
    end
  end

  context 'SHOW /api/users' do
    it 'returns 200 status' do
      id = new_user.id
      get "/api/users/#{id}", headers: setHeaders(id)
      expect(response).to have_http_status(:success)
    end
  end

  context 'CREATE /api/users' do
    it 'returns 200 status' do
      post '/api/users', params: params, headers: headers
      expect(response).to have_http_status(:success)
    end
  end

end
