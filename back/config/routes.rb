Rails.application.routes.draw do
  
  # 固定資産設定  
  get '/api/masters/useful-life', to: 'masters#useful_life'
  get '/api/masters/asset-type', to: 'masters#asset_type'
  get '/api/masters/asset-group', to: 'masters#asset_group'
  get '/api/masters/asset-item', to: 'masters#asset_item'
  get '/api/masters/dep-method', to: 'masters#dep_method'

  get '/api/assets/list', to: 'assets#list'
  post '/api/assets/create', to: 'assets#create'
  get '/api/assets/retrieve', to: 'assets#retrieve'
  # get 'masters/retrieve'
  # get 'masters/update'
  # get 'masters/destroy'

end
