module AssetAcquisition
  extend ActiveSupport::Concern

  def create_with_transaction
    if self.save then
      acq_tran = Transaction.new(
        asset_id: self.id,
        monthly_period_id: MonthlyPeriod.get_monthly_period_id(self.account_id, self.acquisition_date),
        transaction_type_id: 1, #取得
        amount: self.year_start_book_value,
        status: Transaction.statuses[:projected]
      )
      if acq_tran.save then
        deps = self.depreciate
        deps.each do |dep|
          dep_tran = Transaction.new(
            asset_id: self.id,
            transaction_type_id: 2,
            amount: dep[:monthly_dep],
            status: Transaction.statuses[:projected],
            date: dep[:date]
          )
          if dep_tran.save! then
            self
          else
            puts dep_tran.errors.messages
          end
        end
      else
        puts acq_tran.errors.messages
      end
    end
  end

end