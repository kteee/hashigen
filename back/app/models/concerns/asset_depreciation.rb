module AssetDepreciation
  extend ActiveSupport::Concern

  def depreciate
    useful_life_id = self.asset_item.useful_life.id
    dep_ratios = UsefulLife.find(useful_life_id)
    dep_method =  self.depreciation_method.id
    
    # 以下は今回年度取得資産の償却月数の計算
    periods = self.account.accounting_periods
    current_period = get_current_period(periods)
    first_year_depricable_months = get_first_year_depricable_months(self.acquisition_date, Time.parse(current_period[:end]))

    # 1 two_zero_zero_same_ratio 200%定率法
    # 2 new_same_amount 新定額法
    # 3 two_five_zero_same_ratio 250%定率法
    # 4 old_same_amount 旧定額法
    # 5 old_same_ratio  旧定率法
    if dep_method == 1 then #200%定率法
      acquisition_value = self.acquisition_value
      dep_ratio_base = dep_ratios.two_zero_zero_same_ratio_base
      guaranteed_amount = self.acquisition_value * dep_ratios.two_zero_zero_same_ratio_guaranteed
      dep_ratio_revised = dep_ratios.two_zero_zero_same_ratio_revised
      same_ratio_method(acquisition_value, dep_ratio_base, guaranteed_amount, dep_ratio_revised)
    
    elsif dep_method == 2 then #新定額法
      acquisition_value = self.acquisition_value
      book_value = acquisition_value
      dep_ratio = dep_ratios.new_same_amount
      result = []
      year = 1
      while book_value > 1 do
        first_year_apportionment = ( year == 1 ? first_year_depricable_months.quo(12) : 1 ) 
        depreciation = acquisition_value * dep_ratio * first_year_apportionment
        if (book_value - 1) > depreciation then
          result.push({
            year: year,
            amount: depreciation
          })
          year += 1
          book_value -= depreciation
        else
          depreciation = book_value - 1
          result.push({
            year: year,
            amount: depreciation
          })
          year += 1
          book_value -= depreciation
        end
      end
      result

    elsif dep_method == 3 then #250%定率法
      acquisition_value = self.acquisition_value
      dep_ratio_base = dep_ratios.two_five_zero_same_ratio_base
      guaranteed_amount = self.acquisition_value * dep_ratios.two_five_zero_same_ratio_guaranteed
      dep_ratio_revised = dep_ratios.two_five_zero_same_ratio_revised
      same_ratio_method(acquisition_value, dep_ratio_base, guaranteed_amount, dep_ratio_revised)
    
    elsif dep_method == 4 then #旧定額法
      acquisition_value = self.acquisition_value
      book_value = acquisition_value
      acquisition_value_5percent = acquisition_value * 0.05
      dep_ratio = dep_ratios.old_same_amount
      result = []
      year = 1
      while book_value > 1 do
        if book_value > acquisition_value_5percent then
          depreciation = acquisition_value * dep_ratio * 0.9
          if (book_value - acquisition_value_5percent) > depreciation then
            result.push({
              year: year,
              amount: depreciation
            })
            year += 1
            book_value -= depreciation
          else
            depreciation = book_value - acquisition_value_5percent
            result.push({
              year: year,
              amount: depreciation
            })
            year += 1
            book_value -= depreciation
          end
        else
          depreciation = (acquisition_value_5percent - 1) / 5
          if (book_value - 1) > depreciation then
            result.push({
              year: year,
              amount: depreciation
            })
            year += 1
            book_value -= depreciation
          else
            depreciation = book_value - 1
            result.push({
              year: year,
              amount: depreciation
            })
            year += 1
            book_value -= depreciation
          end
        end
      end
      result

    elsif dep_method == 5 then #旧定率法
      acquisition_value = self.acquisition_value
      book_value = acquisition_value
      acquisition_value_5percent = acquisition_value * 0.05
      dep_ratio = dep_ratios.old_same_ratio
      result = []
      year = 1
      while book_value > 1 do
        if book_value > acquisition_value_5percent then
          depreciation = book_value * dep_ratio
          if (book_value - acquisition_value_5percent) > depreciation then
            result.push({
              year: year,
              amount: depreciation
            })
            year += 1
            book_value -= depreciation
          else
            depreciation = book_value - acquisition_value_5percent
            result.push({
              year: year,
              amount: depreciation
            })
            year += 1
            book_value -= depreciation
          end
        else
          depreciation = (acquisition_value_5percent - 1) / 5
          if (book_value - 1) > depreciation then
            result.push({
              year: year,
              amount: depreciation
            })
            year += 1
            book_value -= depreciation
          else
            depreciation = book_value - 1
            result.push({
              year: year,
              amount: depreciation
            })
            year += 1
            book_value -= depreciation
          end
        end
      end
      result
    else
      result
    end
  end

  private
    def same_ratio_method(acquisition_value, dep_ratio_base, guaranteed_amount, dep_ratio_revised)
      # ロジック
      # ①簿価1円超なら計算を回す
      #   ②通常計算償却費が保証価格より多きければ通常計算を回す
      #     （②に該当しない場合）
      #     ③改定取得価格が決まってない時は初年度なので改定取得価格と残り期間償却費を設定する
      #     ④③で設定した償却費だと過剰償却を起こす場合は簿価を1円残すようにする
      #     ⑤④に該当しない場合は改定取得価格に改定償却率をかけた金額を落とす
      book_value = acquisition_value
      acquisition_value_revised = 0 # 改定取得価格
      depreciation_rest = 0 # 改定後償却
      result = []
      year = 1
      while book_value > 1 do
        depreciation = book_value * dep_ratio_base
        if depreciation > guaranteed_amount then
          result.push({
            year: year,
            amount: depreciation
          })
          year += 1
          book_value -= depreciation
        else
          if acquisition_value_revised == 0 then
            acquisition_value_revised = book_value
            depreciation_rest = acquisition_value_revised * dep_ratio_revised
          end
          if depreciation_rest > (book_value - 1) then
            depreciation_rest = book_value - 1
            result.push({
              year: year,
              amount: depreciation_rest
            })
            year += 1
            book_value -= depreciation_rest  
          else
            result.push({
              year: year,
              amount: depreciation_rest
            })
            year += 1
            book_value -= depreciation_rest
          end
        end
      end
      result
    end

    def get_current_period(periods)
    # statusが0のものが今会計年度のものなので、その期間の開始日終了日を取得して返す
    # 引数に入るperiodsはあるアカウントに紐づくAccountingPeriodの配列
      current_period = {}
      periods.each do |period|
        if period.status == 0 then
          current_period = { start: period.start, end: period.end }
          break
        end
      end
      current_period
    end
  
    def get_first_year_depricable_months(start_date, end_date)
    # ある期間の開始日と終了日を入れたら、その期間の月数を返却してくれる
    # 固定資産の償却計算の最終日は必ず月末日になる想定
      first_year_depricable_months = 0
      if end_date.mon == 12 then
        first_year_depricable_months = end_date.mon - start_date.mon + 1
      else
        first_year_depricable_months = ( end_date.mon + 12 ) - start_date.mon + 1
      end
      first_year_depricable_months
    end

end