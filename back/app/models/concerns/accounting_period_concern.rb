module AccountingPeriodConcern
  # メモ おそらくmodule名をスネークケースにしたファイル名にしないとincludeに失敗する
  extend ActiveSupport::Concern
  # AccountingPeriodで呼ばれる
  def create(account_id, monthly_periods)
  # monthly_periodsにはjs側で表示していた以下のようなオブジェクトの配列を使う
  # {"month"=>1, "monthStartDate"=>"2020-01-01", "monthEndDate"=>"2020-01-31"}
    # 1 もしすでにAccountingPeriodが存在する場合、それらのstatusを1つ減らす
    previous_periods = AccountingPeriod.where(account_id: account_id)
    if previous_periods
      previous_periods.each do |period|
        period.status = period.status - 1
        period.save
      end
    end
    # 2 AccountingPeriodを作る
    # create_or_updateで処理を共通化するのでここだけ先処理しておく
    self.account_id = account_id
    self.status = 0
    create_or_update_accounting_period(monthly_periods)
    # 3 月次分割する
    create_or_reattach_monthly_periods(monthly_periods)
  end

  def update(monthly_periods)
  # monthly_periodsにはjs側で表示していた以下のようなオブジェクトの配列を使う
  # {"month"=>1, "monthStartDate"=>"2020-01-01", "monthEndDate"=>"2020-01-31"}
    # 1 最初にAccountingPeriodを更新する
    create_or_update_accounting_period(monthly_periods)
    # 2 過去の同じaccounting_period_idのものは物理削除して3で再登録する
    # このやり方がよいのかはいずれ考える
    if(self.monthly_periods)
      self.monthly_periods.destroy_all
    end
    # 3 月次分割する
    create_or_reattach_monthly_periods(monthly_periods)
  end

  def reopen_previous_year(account_id)
    all_periods = AccountingPeriod.where(account_id: account_id)
    all_periods.each do |period|
      period.status = period.status + 1
      period.save
    end
    self.destroy
  end

  private
    # AccountingPeriodを作るか更新する
    def create_or_update_accounting_period(monthly_periods)
      self.start = Date.parse(monthly_periods[0][:monthStartDate])
      self.end = Date.parse(monthly_periods[monthly_periods.length - 1][:monthEndDate])
      self.save!
    end

    def create_or_reattach_monthly_periods(monthly_periods)
    # 年度繰越をした場合、MonthlyPeriodをnullにしたものがあるので、それと紐付けできるものはして、できないものを登録する
      self_null_monthly_periods = MonthlyPeriod.where(accounting_period_id: nil, account_id: self.account_id)
      monthly_periods.each do |period|
        period_start = Date.parse(period[:monthStartDate])
        period_end = Date.parse(period[:monthEndDate])
        # 1. まずは過去分と紐付けられるものをチェック
        updated_self_null_monthly_period = false
        self_null_monthly_periods.each do |self_null_monthly_period|
          puts self_null_monthly_period.start
          puts self_null_monthly_period.end          
          if (self_null_monthly_period.start === period_start && self_null_monthly_period.end === period_end) then
            self_null_monthly_period.accounting_period_id = self.id
            if self_null_monthly_period.save
              updated_self_null_monthly_period = true
              break # self_null...のeach文を抜ける
            end
          end
        end
        # 2. 1に該当がなかった場合には新規登録としてプログラムを継続する
        unless updated_self_null_monthly_period
          new_period = MonthlyPeriod.new(
            start: period_start,
            end: period_end,
            account_id: self.account_id,
            accounting_period_id: self.id
          )
          new_period.save!
        end
      end
    end

end