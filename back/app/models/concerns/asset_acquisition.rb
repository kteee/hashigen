module AssetAcquisition
  extend ActiveSupport::Concern

  def create_with_transaction
    if self.save!
      # 資産取得登録
      acq_txn = Transaction.new(
        asset_id: self.id,
        monthly_period_id: MonthlyPeriod.get_monthly_period_id(self.account_id, self.acquisition_date),
        transaction_type_id: 1, #取得
        value: self.year_start_book_value,
        status: Transaction.statuses[:unapproved],
        exec_date: self.acquisition_date,
        txn_date: self.acquisition_date.end_of_month
      )
      if acq_txn.save!
        # 減価償却登録 これをこの時点で登録するのが良いのか自信ないが、あえてこの時点で先に登録している
        deps = self.depreciate
        deps.each do |dep|
          monthly_period_id = MonthlyPeriod.get_monthly_period_id(self.account_id, dep[:date])
          dep_txn = Transaction.new(
            asset_id: self.id,
            transaction_type_id: 2,
            monthly_period_id: monthly_period_id,
            value: dep[:monthly_dep] * -1,
            status: Transaction.statuses[:unapproved],
            exec_date: dep[:date],
            txn_date: dep[:date].end_of_month
          )
          if dep_txn.save! then
            self
          else
            dep_txn.errors.messages
          end
        end
      else
        acq_txn.errors.messages
      end
    end #if self.save
  end #def create_with_transaction

end #module