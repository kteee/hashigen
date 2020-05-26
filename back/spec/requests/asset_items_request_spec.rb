require 'rails_helper'

RSpec.describe "AssetItems", type: :request do

  describe "INDEX /api/asset-items" do
    it "returns 200 status" do
      get "/api/asset-items"
      expect(response).to have_http_status(:success)
    end
  end

end
