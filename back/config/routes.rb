Rails.application.routes.draw do
  
  scope :api do
    resources :users
    resources :assets
  end

  # 法定設定周りはgetしかせずcontrollerを増やしたくないので手動で作成  
  get '/api/masters/useful-life', to: 'masters#useful_life'
  get '/api/masters/asset-type', to: 'masters#asset_type'
  get '/api/masters/asset-group', to: 'masters#asset_group'
  get '/api/masters/asset-item', to: 'masters#asset_item'
  get '/api/masters/dep-method', to: 'masters#dep_method'

  post '/api/login', to: 'login#login'

end
