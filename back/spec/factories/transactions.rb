FactoryBot.define do
  factory :transaction do
    asset = FactoryBot.create(:asset)
    asset_id { asset.id }
    monthly_period_id { nil }
    transaction_type_id { 2 }
    value { 300000 }
    status { 'unapproved' }
    exec_date { Date.parse('2020-01-01') }
    txn_date { Date.parse('2020-01-01') }
  end
end
