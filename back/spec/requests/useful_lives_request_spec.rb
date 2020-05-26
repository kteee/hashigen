require 'rails_helper'

RSpec.describe "UsefulLives", type: :request do

  describe "INDEX /api/useful-lives" do
    it "returns 200 status" do
      get "/api/useful-lives"
      expect(response).to have_http_status(:success)
    end
  end

end
