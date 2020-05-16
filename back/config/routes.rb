Rails.application.routes.draw do
  
  scope :api do
    resources :users
    resource :asset, only: [] do
      resource :preview, controller: :asset_preview, only: [:show]
    end
    resource :assets do
      resource :depreciation, controller: :asset_depreciation, only: [:show, :create]
    end
    resources :assets
    resources :accounts
    resources :accounting_periods
    resources :locations, only: [:index, :show]
    resource :current_accounting_period, only: [] do
      resources :monthly_periods, controller: :current_accounting_period_monthly_periods, only: [:index, :show]
    end
  end

  get '/api/account/setting', to: 'accounts#setting'

  # 法定設定周りはgetしかせずcontrollerを増やしたくないので手動で作成  
  get '/api/masters/useful-life', to: 'masters#useful_life'
  get '/api/masters/asset-type', to: 'masters#asset_type'
  get '/api/masters/asset-group', to: 'masters#asset_group'
  get '/api/masters/asset-item', to: 'masters#asset_item'
  get '/api/masters/dep-method', to: 'masters#dep_method'

  post '/api/login', to: 'login#login'
  post '/api/session', to: 'login#session'

end
