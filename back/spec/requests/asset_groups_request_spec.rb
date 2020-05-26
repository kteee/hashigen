require 'rails_helper'

RSpec.describe "AssetGroups", type: :request do

  describe "INDEX /api/asset-groups" do
    it "returns 200 status" do
      get "/api/asset-groups"
      expect(response).to have_http_status(:success)
    end
  end

end
