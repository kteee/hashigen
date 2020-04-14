require 'csv'

# UsefulLife
CSV.foreach('db/csv/useful_life.csv', headers: true) do |row|
  UsefulLife.create(
    year: row['耐用年数'],
    old_same_amount: row['旧定額法'],
    old_same_ratio: row['旧定率法'],
    new_same_amount: row['新定額法'],
    two_five_zero_same_ratio: row['250%償却率'],
    two_five_zero_same_ratio_point: row['250%改定償却率'],
    two_five_zero_same_ratio_after_point: row['250%保証率'],
    two_zero_zero_same_ratio: row['200%償却率'],
    two_zero_zero_same_ratio_point: row['200%改定償却率'],
    two_zero_zero_same_ratio_after_point: row['200%保証率']
  )
end