FactoryBot.define do
  factory :asset do
    name { 'new asset' }
    acquisition_date { Date.parse('2020-01-01') }
    acquisition_value { 300000 }
    asset_item_id { 1 }
    depreciation_method_id { 1 }
    account_id { 1 }
    year_start_book_value { 300000 }
    depreciation_start_date { Date.parse('2020-01-01') }
    location_id { 1 }
    unit_value { 300000 }
    amount { 1 }
  end
end
