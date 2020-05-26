require 'rails_helper'

RSpec.describe "Locations", type: :request do

  describe 'INDEX api/locations' do
    it 'returns 200 status' do
      get '/api/locations'
      expect(response).to have_http_status(:success)
    end
  end

end
