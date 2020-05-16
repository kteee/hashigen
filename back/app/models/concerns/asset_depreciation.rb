module AssetDepreciation
  extend ActiveSupport::Concern

  def depreciate
    # 初期設定
    book_val = self.acquisition_value
    r_conf = self.account.round_config
    periods = self.account.accounting_periods
    current_period = get_current_period(periods)
    fy = current_period[:end].year
    fy_start_month = current_period[:start].month
    dep_start_fy_month = self.depreciation_start_date.month
    fy_months = get_months_of_period(
      start_date: current_period[:start],
      end_date: current_period[:end]
    )
    first_year_depricable_months = get_months_of_period(
      start_date: self.depreciation_start_date,
      end_date: current_period[:end]
    )
    #preview_depreciation呼ぶと[{fy:, dep:, book_val:}...]が返ってくる
    #最初のハッシュはjsのグラフとテーブルの描画用なので処理をスキップする
    yearly_summaries = self.preview_depreciation.select.with_index do |yearly_summary, index|
      index != 0
    end
    #summariesに月次按分償却費を入れる
    summaries = []
    date = Date.new(current_period[:start].year, current_period[:start].month, -1)
    yearly_summaries.each.with_index do |yearly_summary, index|
      year_end_book_val = yearly_summary[:book_val]
      # 初年度は12ヶ月以外が来る可能性を想定しているので月数を計算しセットする
      months = 1..12
      if index === 1 then
        months = 1..(first_year_depricable_months)
      end
      fy = yearly_summary[:fy]
      monthly_dep = yearly_summary[:dep].div(months.count)
      monthly_deps = months.map do |month|
        # 最終月と償却開始日以前の月は償却費を調整を調整する
        if month === months.count then
          monthly_dep = yearly_summary[:dep] - (monthly_dep * (months.count - 1))
        else
          if self.depreciation_start_date > date then
            monthly_dep = 0
          end
        end
        book_val = book_val - monthly_dep
        monthly_dep_info = {
          fy: fy,
          month: month,
          date: date,
          monthly_dep: monthly_dep,
          book_val: book_val,
          year_end_book_val: year_end_book_val
        }
        tomorrow = date.tomorrow
        date = Date.new(tomorrow.year, tomorrow.month, -1)
        monthly_dep_info
      end
      summaries.concat(monthly_deps)
    end
    summaries
  end

  def preview_depreciation
  # includeしたmodelのインスタンスメソッドとして実行できる
  # このメソッドはAssetで呼ばれるので、AssetInstance.depreciate(asset_instance_id)で実行

    # 償却方法に依らない情報を設定する
    useful_life_id = self.asset_item.useful_life.id
    dep_ratios = UsefulLife.find(useful_life_id)
    dep_method =  self.depreciation_method.id
    periods = self.account.accounting_periods
    r_conf = self.account.round_config
    current_period = get_current_period(periods)
    fy = current_period[:end].year
    fy_start_month = current_period[:start].month
    dep_start_fy_month = self.depreciation_start_date.month
    fy_months = get_months_of_period(
      start_date: current_period[:start],
      end_date: current_period[:end]
    )
    first_year_depricable_months = get_months_of_period(
      start_date: self.depreciation_start_date,
      end_date: current_period[:end]
    )

    if dep_method == 1 then #200%定率法
      acq_val = self.acquisition_value
      dep_ratio_base = dep_ratios.two_zero_zero_same_ratio_base
      guaranteed_val = round(self.acquisition_value * dep_ratios.two_zero_zero_same_ratio_guaranteed, r_conf)
      dep_ratio_revised = dep_ratios.two_zero_zero_same_ratio_revised
      same_ratio_method(
        dep_ratio_base: dep_ratio_base,
        dep_ratio_revised: dep_ratio_revised,
        fy: fy,
        fy_start_month: fy_start_month,
        first_year_depricable_months: first_year_depricable_months,
        dep_start_fy_month: dep_start_fy_month,
        fy_months: fy_months,
        guaranteed_val: guaranteed_val,
        acq_val: acq_val,
        r_conf: r_conf
      )
    
    elsif dep_method == 2 then #新定額法
      book_val = acq_val = self.acquisition_value
      dep_ratio = dep_ratios.new_same_amount
      results = [{fy: 0, book_val: acq_val}]
      iy = 1
      while book_val > 1 do
        depricable_months = ( iy == 1 ? first_year_depricable_months : 12 ) 
        first_year_apportionment = ( iy == 1 ? first_year_depricable_months.quo(12) : 1 ) 
        dep = round(acq_val * dep_ratio * first_year_apportionment, r_conf)
        if ( book_val - 1 ) > dep then
          results << {
            fy: fy,
            dep: dep,
            book_val: book_val - dep
          }
          iy, fy, book_val = close_year(
            iy: iy,
            fy: fy,
            book_val: book_val,
            dep: dep
          )
        else
          dep = book_val - 1
          results << {
            fy: fy,
            dep: dep,
            book_val: book_val - dep
          }
          iy, fy, book_val = close_year(
            iy: iy,
            fy: fy,
            book_val: book_val,
            dep: dep
          )
        end
      end
      results

    elsif dep_method == 3 then #250%定率法
      acq_val = self.acquisition_value
      dep_ratio_base = dep_ratios.two_five_zero_same_ratio_base
      guaranteed_val = round(self.acquisition_value * dep_ratios.two_five_zero_same_ratio_guaranteed, r_conf)
      dep_ratio_revised = dep_ratios.two_five_zero_same_ratio_revised
      same_ratio_method(
        dep_ratio_base: dep_ratio_base,
        dep_ratio_revised: dep_ratio_revised,
        fy: fy,
        fy_start_month: fy_start_month,
        first_year_depricable_months: first_year_depricable_months,
        dep_start_fy_month: dep_start_fy_month,
        fy_months: fy_months,
        guaranteed_val: guaranteed_val,
        acq_val: acq_val,
        r_conf: r_conf
      )
    
    elsif dep_method == 4 then #旧定額法
      book_val = acq_val = self.acquisition_value
      acq_val_5percent = round(acq_val * 0.05, r_conf)
      dep_ratio = dep_ratios.old_same_amount
      results = [{fy: 0, book_val: acq_val}]
      iy = 1
      while book_val > 1 do
        if book_val > acq_val_5percent then
          depricable_months = ( iy == 1 ? first_year_depricable_months : 12 ) 
          first_year_apportionment = ( iy == 1 ? first_year_depricable_months.quo(12) : 1 ) 
          dep = round(acq_val * dep_ratio * 0.9 * first_year_apportionment, r_conf)
          if (book_val - acq_val_5percent) > dep then
            results << {
              fy: fy,
              dep: dep,
              book_val: book_val - dep
            }
            iy, fy, book_val = close_year(
              iy: iy,
              fy: fy,
              book_val: book_val,
              dep: dep
            )
          else
            dep = book_val - acq_val_5percent
            results << {
              fy: fy,
              dep: dep,
              book_val: book_val - dep
            }
            iy, fy, book_val = close_year(
              iy: iy,
              fy: fy,
              book_val: book_val,
              dep: dep
            )
          end
        else
          dep = round(((acq_val_5percent - 1) / 5), r_conf)
          if (book_val - 1) > dep then
            results << {
              fy: fy,
              dep: dep,
              book_val: book_val - dep
            }
            iy, fy, book_val = close_year(
              iy: iy,
              fy: fy,
              book_val: book_val,
              dep: dep
            )
          else
            dep = book_val - 1
            results << {
              fy: fy,
              dep: dep,
              book_val: book_val - dep
            }
            iy, fy, book_val = close_year(
              iy: iy,
              fy: fy,
              book_val: book_val,
              dep: dep
            )
          end
        end
      end
      results

    elsif dep_method == 5 then #旧定率法
      book_val = acq_val = self.acquisition_value
      acq_val_5percent = round(acq_val * 0.05, r_conf)
      dep_ratio = dep_ratios.old_same_ratio
      results = [{fy: 0, book_val: acq_val}]
      iy = 1
      while book_val > 1 do
        if book_val > acq_val_5percent then
          months_of_year = ( iy == 1 ? first_year_depricable_months : 12 ) 
          first_year_apportionment = ( iy == 1 ? first_year_depricable_months.quo(12) : 1 ) 
          dep = round(book_val * dep_ratio * first_year_apportionment, r_conf)
          if (book_val - acq_val_5percent) > dep then
            results << {
              fy: fy,
              dep: dep,
              book_val: book_val - dep
            }
            iy, fy, book_val = close_year(
              iy: iy,
              fy: fy,
              book_val: book_val,
              dep: dep
            )
          else
            dep = book_val - acq_val_5percent
            results << {
              fy: fy,
              dep: dep,
              book_val: book_val - dep
            }
            iy, fy, book_val = close_year(
              iy: iy,
              fy: fy,
              book_val: book_val,
              dep: dep
            )
          end
        else
          dep = (acq_val_5percent - 1) / 5
          if (book_val - 1) > dep then
            results << {
              fy: fy,
              dep: dep,
              book_val: book_val - dep
            }
            iy, fy, book_val = close_year(
              iy: iy,
              fy: fy,
              book_val: book_val,
              dep: dep
            )
          else
            dep = book_val - 1
            results << {
              fy: fy,
              dep: dep,
              book_val: book_val - dep
            }
            iy, fy, book_val = close_year(
              iy: iy,
              fy: fy,
              book_val: book_val,
              dep: dep
            )
          end
        end
      end
      results

    elsif dep_method == 6 then #一括償却
      book_val = acq_val = self.acquisition_value
      results = [{fy: 0, book_val: acq_val}]
      iy = 1
      while book_val > 0 do
        dep_ratio = fy_months.quo(36)
        depricable_months = ( iy == 1 ? first_year_depricable_months : 12 ) 
        # first_year_apportionment = ( iy == 1 ? first_year_depricable_months.quo(12) : 1 ) 
        dep = round(acq_val * dep_ratio, r_conf)
        if iy == 1 then
          dep_ratio = fy_months.quo(36)
          depricable_months = first_year_depricable_months
          dep = round(acq_val * dep_ratio, r_conf)
          results << {
              fy: fy,
              dep: dep,
              book_val: book_val - dep
            }
            iy, fy, book_val = close_year(
              iy: iy,
              fy: fy,
              book_val: book_val,
              dep: dep
            )
        else
          dep_ratio = 12.quo(36)
          depricable_months =  12 
          dep = round(acq_val * dep_ratio, r_conf)
          results << {
              fy: fy,
              dep: dep,
              book_val: book_val - dep
            }
            iy, fy, book_val = close_year(
              iy: iy,
              fy: fy,
              book_val: book_val,
              dep: dep
            )
        end
      end
      results
    end
  end

  private
    def round(decimal, round_config)
      rounded_int = decimal
      if round_config === 'rounddown' then
        rounded_int = decimal.floor
      elsif round_config === 'roundup' then
        rounded_int = decimal.ceil
      elsif round_config === 'roundoff' then
        rounded_int = decimal.round
      end
      rounded_int
    end

    def same_ratio_method(
      dep_ratio_base:,
      dep_ratio_revised:,
      fy:,
      fy_start_month:,
      first_year_depricable_months:,
      dep_start_fy_month:,
      fy_months:,
      guaranteed_val:,
      acq_val:,
      r_conf:
    )
    # ロジック
    # ①簿価1円超なら計算を回す
    #   ②通常計算償却費が保証価格より多きければ通常計算を回す
    #     （②に該当しない場合）
    #     ③改定取得価格が決まってない時は初年度なので改定取得価格と残り期間償却費を設定する
    #     ④③で設定した償却費だと過剰償却を起こす場合は簿価を1円残すようにする
    #     ⑤④に該当しない場合は改定取得価格に改定償却率をかけた金額を落とす
      book_val = acq_val
      acq_val_revised = 0 # 改定取得価格
      dep_rest = 0 # 改定後償却
      results = [{fy: 0, book_val: acq_val}]
      iy = 1
      while book_val > 1 do
        depricable_months = ( iy == 1 ? first_year_depricable_months : 12 ) 
        first_year_apportionment = ( iy == 1 ? first_year_depricable_months.quo(12) : 1 )
        dep = round(book_val * dep_ratio_base * first_year_apportionment, r_conf)
        if dep > guaranteed_val then
          results << {
            fy: fy,
            dep: dep,
            book_val: book_val - dep
          }
          iy, fy, book_val = close_year(
            iy: iy,
            fy: fy,
            book_val: book_val,
            dep: dep
          )
        else
          if acq_val_revised == 0 then
            acq_val_revised = book_val
            dep_rest = round(acq_val_revised * dep_ratio_revised, r_conf)
          end
          if dep_rest > (book_val - 1) then
            dep = book_val - 1
            results << {
              fy: fy,
              dep: dep,
              book_val: book_val - dep
            }
            iy, fy, book_val = close_year(
              iy: iy,
              fy: fy,
              book_val: book_val,
              dep: dep
            )
          else
            dep = dep_rest
            results << {
              fy: fy,
              dep: dep,
              book_val: book_val - dep
            }
            iy, fy, book_val = close_year(
              iy: iy,
              fy: fy,
              book_val: book_val,
              dep: dep
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

    def close_year(
      iy:,
      fy:,
      book_val:,
      dep:
    )
      iy += 1
      fy += 1
      book_val -= dep
      return iy, fy, book_val
    end

end