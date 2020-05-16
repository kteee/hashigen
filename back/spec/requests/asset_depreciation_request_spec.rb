require 'rails_helper'

RSpec.describe "AssetDepreciations", type: :request do

  describe "GET /create" do
    it "returns http success" do
      get "/asset_depreciation/create"
      expect(response).to have_http_status(:success)
    end
  end

end
