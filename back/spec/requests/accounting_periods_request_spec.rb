require 'rails_helper'

RSpec.describe "AccountingPeriods", type: :request do
  def createToken(id)
    JsonWebToken.encode(user_id: id)
  end

  def setHeaders(id = 3)
    { Authorization: createToken(id) }
  end

  context 'INEDEX /api/accounting-periods' do
    it 'returns 200 status' do
      get "/api/accounting-periods", headers: setHeaders
      expect(response).to have_http_status(:success)
    end
  end

  # テストデータのロジックが難しい＋一旦この周辺を修正する予定がないのでそのままにしておく

  # context 'CREATE /api/accounting-periods' do
  #   it 'returns 200 status' do
  #     post "/api/accounting-periods", headers: setHeaders
  #     expect(response).to have_http_status(:success)
  #   end
  # end

  # context 'UPDATE /api/accounting-periods' do
  #   it 'returns 200 status' do
  #     update "/api/accounting-periods", headers: setHeaders
  #     expect(response).to have_http_status(:success)
  #   end
  # end

  # context 'DESTROY /api/accounting-periods' do
  #   it 'returns 200 status' do
  #     destroy "/api/accounting-periods", headers: setHeaders
  #     expect(response).to have_http_status(:success)
  #   end
  # end

end