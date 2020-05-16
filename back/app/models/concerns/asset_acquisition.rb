module AssetAcquisition
  extend ActiveSupport::Concern

  def create_with_transaction
    if self.save
      # 資産取得登録
      acq_tran = Transaction.new(
        asset_id: self.id,
        monthly_period_id: MonthlyPeriod.get_monthly_period_id(self.account_id, self.acquisition_date),
        transaction_type_id: 1, #取得
        amount: self.year_start_book_value,
        status: Transaction.statuses[:projected]
      )
      if acq_tran.save
        # 減価償却登録 これをこの時点で登録するのが良いのか自信ないが、あえてこの時点で先に登録している
        deps = self.depreciate
        deps.each do |dep|
          monthly_period_id = MonthlyPeriod.get_monthly_period_id(self.account_id, dep[:date])
          dep_tran = Transaction.new(
            asset_id: self.id,
            transaction_type_id: 2,
            monthly_period_id: monthly_period_id,
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
    end #if self.save
  end #def create_with_transaction

end #module