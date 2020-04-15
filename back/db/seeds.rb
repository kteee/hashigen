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
CSV.foreach('db/csv/asset_item.csv', headers: true) do |row|
  AssetItem.create(
    asset_group_id: row[0],
    item: row[1],
    useful_life_id: row[3]
  )
end