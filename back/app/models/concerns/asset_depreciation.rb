module AssetDepreciation
  extend ActiveSupport::Concern

  def depreciate
  # includeしたmodelのインスタンスメソッドとして実行できる
  # このメソッドはAssetで呼ばれるので、AssetInstance.depreciate(asset_instance_id)で実行
  # 金額部分はフロント側でカンマ区切りで表示するよう文字列にして返す
  
    # 償却方法に依らない情報を計算する
    useful_life_id = self.asset_item.useful_life.id
    dep_ratios = UsefulLife.find(useful_life_id)
    dep_method =  self.depreciation_method.id
    periods = self.account.accounting_periods
    current_period = get_current_period(periods)
    fiscal_year = Time.parse(current_period[:end]).year
    fiscal_year_start_month = Time.parse(current_period[:start]).month
    depreciation_start_fiscal_year_month = self.acquisition_date.month
    fiscal_year_months = get_months_of_period(
      start_date: Time.parse(current_period[:start]),
      end_date: Time.parse(current_period[:end])
    )
    first_year_depricable_months = get_months_of_period(
      start_date: self.acquisition_date,
      end_date: Time.parse(current_period[:end])
    )

    if dep_method == 1 then #200%定率法
      acquisition_value = self.acquisition_value
      dep_ratio_base = dep_ratios.two_zero_zero_same_ratio_base
      guaranteed_amount = self.acquisition_value * dep_ratios.two_zero_zero_same_ratio_guaranteed
      dep_ratio_revised = dep_ratios.two_zero_zero_same_ratio_revised
      same_ratio_method(
        dep_ratio_base: dep_ratio_base,
        dep_ratio_revised: dep_ratio_revised,
        fiscal_year: fiscal_year,
        fiscal_year_start_month: fiscal_year_start_month,
        first_year_depricable_months: first_year_depricable_months,
        depreciation_start_fiscal_year_month: depreciation_start_fiscal_year_month,
        fiscal_year_months: fiscal_year_months,
        guaranteed_amount: guaranteed_amount,
        acquisition_value: acquisition_value
      )
    
    elsif dep_method == 2 then #新定額法
      book_value = acquisition_value = self.acquisition_value
      dep_ratio = dep_ratios.new_same_amount
      results = []
      index_year = 1
      while book_value > 1 do
        depricable_months = ( index_year == 1 ? first_year_depricable_months : 12 ) 
        first_year_apportionment = ( index_year == 1 ? first_year_depricable_months.quo(12) : 1 ) 
        depreciation = (acquisition_value * dep_ratio * first_year_apportionment).floor
        if ( book_value - 1 ) > depreciation then
          monthly_result = allocate_depreciation_by_month(
            index_year: index_year,
            fiscal_year: fiscal_year,
            fiscal_year_start_month: fiscal_year_start_month,
            depreciation_start_fiscal_year_month: depreciation_start_fiscal_year_month,
            fiscal_year_months: fiscal_year_months,
            depricable_months: depricable_months,
            depreciation: depreciation
          )
          results.concat(monthly_result)
          index_year, fiscal_year, book_value = close_year(
            index_year: index_year,
            fiscal_year: fiscal_year,
            book_value: book_value,
            depreciation: depreciation
          )
        else
          depreciation = book_value - 1
          monthly_result = allocate_depreciation_by_month(
            index_year: index_year,
            fiscal_year: fiscal_year,
            fiscal_year_start_month: fiscal_year_start_month,
            depreciation_start_fiscal_year_month: depreciation_start_fiscal_year_month,
            fiscal_year_months: fiscal_year_months,
            depricable_months: depricable_months,
            depreciation: depreciation
          )
          results.concat(monthly_result)
          index_year, fiscal_year, book_value = close_year(
            index_year: index_year,
            fiscal_year: fiscal_year,
            book_value: book_value,
            depreciation: depreciation
          )
        end
      end
      results

    elsif dep_method == 3 then #250%定率法
      acquisition_value = self.acquisition_value
      dep_ratio_base = dep_ratios.two_five_zero_same_ratio_base
      guaranteed_amount = self.acquisition_value * dep_ratios.two_five_zero_same_ratio_guaranteed
      dep_ratio_revised = dep_ratios.two_five_zero_same_ratio_revised
      same_ratio_method(
        dep_ratio_base: dep_ratio_base,
        dep_ratio_revised: dep_ratio_revised,
        fiscal_year: fiscal_year,
        fiscal_year_start_month: fiscal_year_start_month,
        first_year_depricable_months: first_year_depricable_months,
        depreciation_start_fiscal_year_month: depreciation_start_fiscal_year_month,
        fiscal_year_months: fiscal_year_months,
        guaranteed_amount: guaranteed_amount,
        acquisition_value: acquisition_value
      )
    
    elsif dep_method == 4 then #旧定額法
      book_value = acquisition_value = self.acquisition_value
      acquisition_value_5percent = acquisition_value * 0.05
      dep_ratio = dep_ratios.old_same_amount
      results = []
      index_year = 1
      while book_value > 1 do
        if book_value > acquisition_value_5percent then
          depricable_months = ( index_year == 1 ? first_year_depricable_months : 12 ) 
          first_year_apportionment = ( index_year == 1 ? first_year_depricable_months.quo(12) : 1 ) 
          depreciation = (acquisition_value * dep_ratio * 0.9 * first_year_apportionment).floor
          if (book_value - acquisition_value_5percent) > depreciation then
            monthly_result = allocate_depreciation_by_month(
              index_year: index_year,
              fiscal_year: fiscal_year,
              fiscal_year_start_month: fiscal_year_start_month,
              depreciation_start_fiscal_year_month: depreciation_start_fiscal_year_month,
              fiscal_year_months: fiscal_year_months,
              depricable_months: depricable_months,
              depreciation: depreciation
            )
            results.concat(monthly_result)
            index_year, fiscal_year, book_value = close_year(
              index_year: index_year,
              fiscal_year: fiscal_year,
              book_value: book_value,
              depreciation: depreciation
            )
          else
            depreciation = book_value - acquisition_value_5percent
            monthly_result = allocate_depreciation_by_month(
              index_year: index_year,
              fiscal_year: fiscal_year,
              fiscal_year_start_month: fiscal_year_start_month,
              depreciation_start_fiscal_year_month: depreciation_start_fiscal_year_month,
              fiscal_year_months: fiscal_year_months,
              depricable_months: depricable_months,
              depreciation: depreciation
            )
            results.concat(monthly_result)
            index_year, fiscal_year, book_value = close_year(
              index_year: index_year,
              fiscal_year: fiscal_year,
              book_value: book_value,
              depreciation: depreciation
            )
          end
        else
          depreciation = (acquisition_value_5percent - 1) / 5
          if (book_value - 1) > depreciation then
            monthly_result = allocate_depreciation_by_month(
              index_year: index_year,
              fiscal_year: fiscal_year,
              fiscal_year_start_month: fiscal_year_start_month,
              depreciation_start_fiscal_year_month: depreciation_start_fiscal_year_month,
              fiscal_year_months: fiscal_year_months,
              depricable_months: depricable_months,
              depreciation: depreciation
            )
            results.concat(monthly_result)
            index_year, fiscal_year, book_value = close_year(
              index_year: index_year,
              fiscal_year: fiscal_year,
              book_value: book_value,
              depreciation: depreciation
            )
          else
            depreciation = book_value - 1
            monthly_result = allocate_depreciation_by_month(
              index_year: index_year,
              fiscal_year: fiscal_year,
              fiscal_year_start_month: fiscal_year_start_month,
              depreciation_start_fiscal_year_month: depreciation_start_fiscal_year_month,
              fiscal_year_months: fiscal_year_months,
              depricable_months: depricable_months,
              depreciation: depreciation
            )
            results.concat(monthly_result)
            index_year, fiscal_year, book_value = close_year(
              index_year: index_year,
              fiscal_year: fiscal_year,
              book_value: book_value,
              depreciation: depreciation
            )
          end
        end
      end
      results

    elsif dep_method == 5 then #旧定率法
      book_value = acquisition_value = self.acquisition_value
      acquisition_value_5percent = acquisition_value * 0.05
      dep_ratio = dep_ratios.old_same_ratio
      results = []
      index_year = 1
      while book_value > 1 do
        if book_value > acquisition_value_5percent then
          months_of_year = ( index_year == 1 ? first_year_depricable_months : 12 ) 
          first_year_apportionment = ( index_year == 1 ? first_year_depricable_months.quo(12) : 1 ) 
          depreciation = (book_value * dep_ratio * first_year_apportionment).floor
          if (book_value - acquisition_value_5percent) > depreciation then
            result_by_monthly = allocate_depreciation_by_month(
              index_year: index_year,
              fiscal_year: fiscal_year,
              fiscal_year_start_month: fiscal_year_start_month,
              depreciation_start_fiscal_year_month: depreciation_start_fiscal_year_month,
              fiscal_year_months: fiscal_year_months,
              depricable_months: depricable_months,
              depreciation: depreciation
            )
            results.concat(result_by_monthly)
            index_year, fiscal_year, book_value = close_year(
              index_year: index_year,
              fiscal_year: fiscal_year,
              book_value: book_value,
              depreciation: depreciation
            )
          else
            depreciation = book_value - acquisition_value_5percent
            result_by_monthly = allocate_depreciation_by_month(
              index_year: index_year,
              fiscal_year: fiscal_year,
              fiscal_year_start_month: fiscal_year_start_month,
              depreciation_start_fiscal_year_month: depreciation_start_fiscal_year_month,
              fiscal_year_months: fiscal_year_months,
              depricable_months: depricable_months,
              depreciation: depreciation
            )
            results.concat(result_by_monthly)
            index_year, fiscal_year, book_value = close_year(
              index_year: index_year,
              fiscal_year: fiscal_year,
              book_value: book_value,
              depreciation: depreciation
            )
          end
        else
          depreciation = (acquisition_value_5percent - 1) / 5
          if (book_value - 1) > depreciation then
            result_by_monthly = allocate_depreciation_by_month(
              index_year: index_year,
              fiscal_year: fiscal_year,
              fiscal_year_start_month: fiscal_year_start_month,
              depreciation_start_fiscal_year_month: depreciation_start_fiscal_year_month,
              fiscal_year_months: fiscal_year_months,
              depricable_months: depricable_months,
              depreciation: depreciation
            )
            results.concat(result_by_monthly)
            index_year, fiscal_year, book_value = close_year(
              index_year: index_year,
              fiscal_year: fiscal_year,
              book_value: book_value,
              depreciation: depreciation
            )
          else
            depreciation = book_value - 1
            result_by_monthly = allocate_depreciation_by_month(
              index_year: index_year,
              fiscal_year: fiscal_year,
              fiscal_year_start_month: fiscal_year_start_month,
              depreciation_start_fiscal_year_month: depreciation_start_fiscal_year_month,
              fiscal_year_months: fiscal_year_months,
              depricable_months: depricable_months,
              depreciation: depreciation
            )
            results.concat(result_by_monthly)
            index_year, fiscal_year, book_value = close_year(
              index_year: index_year,
              fiscal_year: fiscal_year,
              book_value: book_value,
              depreciation: depreciation
            )
          end
        end
      end
      results

    elsif dep_method == 6 then #一括償却
      book_value = acquisition_value = self.acquisition_value
      results = []
      index_year = 1
      while book_value > 0 do
        dep_ratio = fiscal_year_months.quo(36)
        depricable_months = ( index_year == 1 ? first_year_depricable_months : 12 ) 
        # first_year_apportionment = ( index_year == 1 ? first_year_depricable_months.quo(12) : 1 ) 
        depreciation = acquisition_value * dep_ratio
        if index_year == 1 then
          dep_ratio = fiscal_year_months.quo(36)
          depricable_months = first_year_depricable_months
          depreciation = acquisition_value * dep_ratio
          monthly_result = allocate_depreciation_by_month(
            index_year: index_year,
            fiscal_year: fiscal_year,
            fiscal_year_start_month: fiscal_year_start_month,
            depreciation_start_fiscal_year_month: depreciation_start_fiscal_year_month,
            fiscal_year_months: fiscal_year_months,
            depricable_months: depricable_months,
            depreciation: depreciation
          )
          results.concat(monthly_result)
          index_year, fiscal_year, book_value = close_year(
            index_year: index_year,
            fiscal_year: fiscal_year,
            book_value: book_value,
            depreciation: depreciation
          )
        else
          dep_ratio = 12.quo(36)
          depricable_months =  12 
          depreciation = acquisition_value * dep_ratio
          monthly_result = allocate_depreciation_by_month(
            index_year: index_year,
            fiscal_year: fiscal_year,
            fiscal_year_start_month: fiscal_year_start_month,
            depreciation_start_fiscal_year_month: depreciation_start_fiscal_year_month,
            fiscal_year_months: fiscal_year_months,
            depricable_months: depricable_months,
            depreciation: depreciation
          )
          results.concat(monthly_result)
          index_year, fiscal_year, book_value = close_year(
            index_year: index_year,
            fiscal_year: fiscal_year,
            book_value: book_value,
            depreciation: depreciation
          )
        end
      end
      results
    end
  end

  private
    def same_ratio_method(
      dep_ratio_base:,
      dep_ratio_revised:,
      fiscal_year:,
      first_year_depricable_months:,
      fiscal_year_start_month:,
      depreciation_start_fiscal_year_month:,
      fiscal_year_months:,
      acquisition_value:,
      guaranteed_amount:
    )
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
      results = []
      index_year = 1
      while book_value > 1 do
        depricable_months = ( index_year == 1 ? first_year_depricable_months : 12 ) 
        first_year_apportionment = ( index_year == 1 ? first_year_depricable_months.quo(12) : 1 )
        depreciation = (book_value * dep_ratio_base * first_year_apportionment).floor
        if depreciation > guaranteed_amount then
          monthly_result = allocate_depreciation_by_month(
            index_year: index_year,
            fiscal_year: fiscal_year,
            fiscal_year_start_month: fiscal_year_start_month,
            depreciation_start_fiscal_year_month: depreciation_start_fiscal_year_month,
            fiscal_year_months: fiscal_year_months,
            depricable_months: depricable_months,
            depreciation: depreciation
          )
          results.concat(monthly_result)
          index_year, fiscal_year, book_value = close_year(
            index_year: index_year,
            fiscal_year: fiscal_year,
            book_value: book_value,
            depreciation: depreciation
          )
        else
          if acquisition_value_revised == 0 then
            acquisition_value_revised = book_value
            depreciation_rest = acquisition_value_revised * dep_ratio_revised
          end
          if depreciation_rest > (book_value - 1) then
            depreciation_rest = book_value - 1
            monthly_result = allocate_depreciation_by_month(
              index_year: index_year,
              fiscal_year: fiscal_year,
              fiscal_year_start_month: fiscal_year_start_month,
              depreciation_start_fiscal_year_month: depreciation_start_fiscal_year_month,
              fiscal_year_months: fiscal_year_months,
              depricable_months: depricable_months,
              depreciation: depreciation
            )
            results.concat(monthly_result)
            index_year, fiscal_year, book_value = close_year(
              index_year: index_year,
              fiscal_year: fiscal_year,
              book_value: book_value,
              depreciation: depreciation_rest
            )
          else
            monthly_result = allocate_depreciation_by_month(
              index_year: index_year,
              fiscal_year: fiscal_year,
              fiscal_year_start_month: fiscal_year_start_month,
              depreciation_start_fiscal_year_month: depreciation_start_fiscal_year_month,
              fiscal_year_months: fiscal_year_months,
              depricable_months: depricable_months,
              depreciation: depreciation
            )
            results.concat(monthly_result)
            index_year, fiscal_year, book_value = close_year(
              index_year: index_year,
              fiscal_year: fiscal_year,
              book_value: book_value,
              depreciation: depreciation_rest
            )
          end
        end
      end
      results
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
  
    def get_months_of_period(
      start_date:,
      end_date:
    )
    # ある期間の開始日と終了日を入れたら、その期間の月数を返却してくれる
    # 最終日は必ず月末日になる想定（法律的にそうならないケースもあると思うがそのケースは限りなく0に近いと思うので考慮しない）
      months = 0
      if end_date.mon == 12 then
        months = end_date.mon - start_date.mon + 1
      else
        months = ( end_date.mon + 12 ) - start_date.mon + 1
      end
      months
    end

    def allocate_depreciation_by_month(
      index_year:,
      fiscal_year:,
      fiscal_year_start_month:,
      depreciation_start_fiscal_year_month:,
      fiscal_year_months:,
      depricable_months:,
      depreciation:
    )
      results = []
      monthly_depreciation = depreciation.div(depricable_months)
      fiscal_year_month = fiscal_year_start_month
      depreciation_start_index_month = fiscal_year_months - depricable_months + 1
      (1..fiscal_year_months).each do |index_month|
        if index_month == fiscal_year_months then
          puts depreciation
          puts monthly_depreciation
          puts (depricable_months - 1)
          monthly_depreciation_adjusted = depreciation - ( monthly_depreciation * ( depricable_months - 1 ) )
          result, fiscal_year_month = set_depreciation_result(
            index_year: index_year,
            index_month: index_month,
            fiscal_year: fiscal_year,
            fiscal_year_month: fiscal_year_month,
            monthly_depreciation: monthly_depreciation_adjusted.to_s(:delimited)
          )
          results.push(result)
        elsif index_month >= depreciation_start_index_month then
          result, fiscal_year_month = set_depreciation_result(
            index_year: index_year,
            index_month: index_month,
            fiscal_year: fiscal_year,
            fiscal_year_month: fiscal_year_month,
            monthly_depreciation: monthly_depreciation.to_s(:delimited)
          )
          results.push(result)
        else 
          result, fiscal_year_month = set_depreciation_result(
            index_year: index_year,
            index_month: index_month,
            fiscal_year: fiscal_year,
            fiscal_year_month: fiscal_year_month,
            monthly_depreciation: "0"
          )
          results.push(result)
        end
      end
      results
    end

    def set_depreciation_result(
      index_year:,
      index_month:,
      fiscal_year:,
      fiscal_year_month:,
      monthly_depreciation:
    )
      result = {
        index_year: index_year,
        index_month: index_month,
        fiscal_year: fiscal_year,
        fiscal_year_month: fiscal_year_month,
        amount: monthly_depreciation
      }
      fiscal_year_month == 12 ? fiscal_year_month = 0 : fiscal_year_month += 1
      return result, fiscal_year_month
    end

    def close_year(
      index_year:,
      fiscal_year:,
      book_value:,
      depreciation:
    )
      index_year += 1
      fiscal_year += 1
      book_value -= depreciation
      return index_year, fiscal_year, book_value
    end

end