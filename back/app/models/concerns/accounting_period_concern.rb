module AccountingPeriodConcern
  # メモ おそらくmodule名をスネークケースにしたファイル名にしないとincludeに失敗する
  extend ActiveSupport::Concern
  # AccountingPeriodで呼ばれる
  
  def update(monthly_periods)
  # monthly_periodsにはjs側で表示していた以下のようなオブジェクトの配列を使う
  # {"month"=>1, "monthStartDate"=>"2020-01-01T00:00:00.000Z", "monthEndDate"=>"2020-01-30T15:00:00.000Z"}
  
    # 1 最初にAccountingPeriodを更新する
    self.start = Time.parse(monthly_periods[0][:monthStartDate])
    self.end = Time.parse(monthly_periods[monthly_periods.length - 1][:monthEndDate])
    self.save

    # 2 月次分割する
    monthly_periods.each do |period|
      new_period = MonthlyPeriod.new
      new_period.start = Time.parse(period[:monthStartDate])
      new_period.end = Time.parse(period[:monthEndDate])
      new_period.accounting_period_id = self.id
      new_period.save
    end
    self
  end

end