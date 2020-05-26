require 'rails_helper'

RSpec.describe "Assets", type: :request do

  def createToken(id)
    JsonWebToken.encode(user_id: id)
  end

  def setHeaders(id = 3)
    { Authorization: createToken(id) }
  end

  let(:params) {{
    name: 'new asset',
    acquisition_date: '2020-05-25',
    asset_item_id: 1,
    depreciation_method_id: 1,
    account_id: 1,
    year_start_book_value: 300000,
    depreciation_start_date:  '2020-05-25',
    location_id: 1,
    unit_value: 300000,
    amount: 1,
    acquisition_value: 300000
  }}

  let(:new_asset) { FactoryBot.create(:asset) }

  context 'INDEX /api/assets' do
    it 'returns 200 status' do
      get '/api/assets', headers: setHeaders
      expect(response).to have_http_status(:success)
    end
  end

  context 'SHOW /api/assets' do
    it 'returns 200 status' do
      id = new_asset.id
      get "/api/assets/#{id}", headers: setHeaders
      expect(response).to have_http_status(:success)
    end
  end

  context 'CREATE /api/assets' do
    it 'returns 200 status' do
      post '/api/assets', params: params, headers: setHeaders
      expect(response).to have_http_status(:success)
    end
  end

  context 'DELETE /api/assets' do
    it 'returns 200 status' do
      id = new_asset.id
      delete "/api/assets/#{id}", headers: setHeaders
      expect(response).to have_http_status(:success)
    end
  end

end
