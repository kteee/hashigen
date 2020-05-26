Rails.application.routes.draw do
  
  scope :api do
    resources :users
    resource :assets, only: [] do
      resource :depreciation, controller: :asset_depreciation, only: [:show, :create]
    end
    resources :assets
    resources :accounts
    resources :accounting_periods, path: 'accounting-periods', only: [:index, :create, :update, :destroy]
    resources :locations, only: [:index, :show]
    resources :transactions, only: [:index]
    resource :asset_preview, path: 'asset/preview', controller: :asset_preview, only: [:show]
    resources :asset_groups, path: 'asset-groups', only: [:index]
    resources :useful_lives, path: 'useful-lives', only: [:index]
    resources :dep_methods, path: 'dep-methods', only: [:index]
    resources :asset_items, path: 'asset-items', only: [:index]
    resources :unapproved_transactions, path: 'transactions/unapproved', only: [:index]
  end

  post '/api/login', to: 'login#login'
  post '/api/session', to: 'login#session'

end