require 'rails_helper'

RSpec.describe "AssetPreviews", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/asset_preview/index"
      expect(response).to have_http_status(:success)
    end
  end

end
