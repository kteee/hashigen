require 'csv'

# UsefulLife
# CSV.foreach('db/csv/useful_life.csv', headers: true) do |row|
#   UsefulLife.create(
#     year: row['耐用年数'],
#     old_same_amount: row['旧定額法'],
#     old_same_ratio: row['旧定率法'],
#     new_same_amount: row['新定額法'],
#     two_five_zero_same_ratio: row['250%償却率'],
#     two_five_zero_same_ratio_point: row['250%改定償却率'],
#     two_five_zero_same_ratio_after_point: row['250%保証率'],
#     two_zero_zero_same_ratio: row['200%償却率'],
#     two_zero_zero_same_ratio_point: row['200%改定償却率'],
#     two_zero_zero_same_ratio_after_point: row['200%保証率']
#   )
# end

# AssetType(決算書大区分)
# types = ['有形固定資産','無形固定資産','投資その他資産']
# types.each do |type|
#   AssetType.create(name: type)
# end

# AssetGroup(決算書区分)
# CSV.foreach('db/csv/asset_group.csv') do |row|
#   AssetGroup.create(name: row[1])
# end

# AssetItems
# CSV.foreach('db/csv/asset_item.csv', headers: true) do |row|
#   AssetItem.create(
#     asset_group_id: row[0],
#     item: row[1],
#     useful_life_id: row[3]
#   )
# end

# DepMethods
# dep_methods = [
#   {
#     name: 'two_zero_zero_same_ratio',
#     display_name: '200%定率法'
#   },
#   {
#     name: 'new_same_amount',
#     display_name: '新定額法'
#   },
#   {
#     name: 'two_five_zero_same_ratio',
#     display_name: '250%定率法'
#   },
#   {
#     name: 'old_same_amount',
#     display_name: '旧定額法'
#   },
#   {
#     name: 'old_same_ratio',
#     display_name: '旧定率法'
#   }
# ]
# dep_methods.each do |method|
#   DepreciationMethod.create(
#     name: method[:name],
#     display_name: method[:display_name]
#   )
# end

# DepMethods(DBrollbackで一部の列が落ちたので復元)
# dep_methods = DepreciationMethod.all
# dep_methods.each do |dep_method|
#   if dep_method.id == 1 then
#     dep_method.display_name = '200%定率法'
#   elsif dep_method.id == 2 then
#     dep_method.display_name = '新定額法'
#   elsif dep_method.id == 3 then
#     dep_method.display_name = '250%定率法'
#   elsif dep_method.id == 4 then
#     dep_method.display_name = '旧定額法'
#   elsif dep_method.id == 5 then
#     dep_method.display_name = '旧定率法'
#   end
#   dep_method.save
# end

# transaction_types
# transaction_types = [
#   {name: 'acquisition', display_name: '取得'},
#   {name: 'depreciation', display_name: '減価償却'},
#   {name: 'impairment', display_name: '減損'},
#   {name: 'retirement', display_name: '除却'},
#   {name: 'sales', display_name: '売却'},
# ]

# transaction_types.each do |type|
#   TransactionType.create(
#     name: type[:name],
#     display_name: type[:display_name]
#   )
# end

# UsefulLife
# 政令指定都市は一旦ローカルでは作らず止めておく
# CSV.foreach('db/csv/location_codes/cities.csv', headers: true) do |row|
#   Location.create(
#     code: row['コード'],
#     prefecture: row['都道府県'],
#     city: row['市区町村'],
#     prefecture_kana: row['都道府県読み'],
#     city_kana: row['市区町村読み']
#   )
# end

# transaction_types
monthly_periods = [
  {start: '2020-02-01', end: '2020-02-28'},
  {start: '2020-03-01', end: '2020-03-31'},
  {start: '2020-04-01', end: '2020-04-30'},
  {start: '2020-05-01', end: '2020-05-31'},
  {start: '2020-06-01', end: '2020-06-30'},
  {start: '2020-07-01', end: '2020-07-31'},
  {start: '2020-08-01', end: '2020-08-31'},
  {start: '2020-09-01', end: '2020-09-30'},
  {start: '2020-10-01', end: '2020-10-31'},
  {start: '2020-11-01', end: '2020-11-30'},
  {start: '2020-12-01', end: '2020-12-31'},
]

monthly_periods.each do |period|
  MonthlyPeriod.create(
    start: Time.parse(period[:start]),
    end: Time.parse(period[:end]),
    accounting_period_id: 3
  )
end