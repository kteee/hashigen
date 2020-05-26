require 'rails_helper'

RSpec.describe 'AssetPreviews', type: :request do

  def createToken
    JsonWebToken.encode(user_id: 3)
  end
  
  let(:headers) {{
    Authorization: createToken,
    CONTENT_TYPE: 'application/json'
  }}

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

  describe 'INDEX /api/asset/preview' do
    it 'returns 200 status' do
      get '/api/asset/preview', params: params, headers: headers
      expect(response).to have_http_status(:success)
    end
  end

end
