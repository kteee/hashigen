class AssetsController < ApplicationController

  def index
    all_assets = Asset.all
    response = []
    all_assets.each do |asset|
      response.push({
        id: asset.id, 
        name: asset.name,
        acquisition_date: asset.acquisition_date,
        acquisition_value: asset.acquisition_value,
        useful_life: asset.asset_item.useful_life.year,
        depreciation_method: asset.depreciation_method.display_name,
        created_at: asset.created_at.strftime("%Y-%m-%d"),
        updated_at: asset.updated_at.strftime("%Y-%m-%d")
      })
    end
    response_get_success(response)
  end
  
  def create
    new_asset = Asset.new(params)
    if new_asset.save
      response_post_success
    else
      response_error
    end
  end

  def show
    asset = Asset.find(params[:id])
    depreciation = depreciate(asset)
    response = { asset: asset, depreciation: depreciation}
    response_get_success(response)
  end

  public # 定額法と定率法の共通部分をここで定義
    def depreciate(asset)
      useful_life = asset.asset_item.useful_life.id
      dep_ratios = UsefulLife.find(useful_life)
      dep_method =  asset.depreciation_method.id
      # 1 two_zero_zero_same_ratio 200%定率法
      # 2 new_same_amount 新定額法
      # 3 two_five_zero_same_ratio 250%定率法
      # 4 old_same_amount 旧定額法
      # 5 old_same_ratio  旧定率法

      if dep_method == 1 then #200%定率法
        acquisition_value = asset.acquisition_value
        dep_ratio_base = dep_ratios.two_zero_zero_same_ratio_base
        guaranteed_amount = asset.acquisition_value * dep_ratios.two_zero_zero_same_ratio_guaranteed
        dep_ratio_revised = dep_ratios.two_zero_zero_same_ratio_revised
        same_ratio_method(acquisition_value, dep_ratio_base, guaranteed_amount, dep_ratio_revised)
      
      elsif dep_method == 2 then #新定額法
        acquisition_value = asset.acquisition_value
        book_value = acquisition_value
        dep_ratio = dep_ratios.new_same_amount
        result = []
        year = 1
        while book_value > 1 do
          depreciation = acquisition_value * dep_ratio
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
          puts result
        end
        result

      elsif dep_method == 3 then #250%定率法
        acquisition_value = asset.acquisition_value
        dep_ratio_base = dep_ratios.two_five_zero_same_ratio_base
        guaranteed_amount = asset.acquisition_value * dep_ratios.two_five_zero_same_ratio_guaranteed
        dep_ratio_revised = dep_ratios.two_five_zero_same_ratio_revised
        same_ratio_method(acquisition_value, dep_ratio_base, guaranteed_amount, dep_ratio_revised)
      
      elsif dep_method == 4 then #旧定額法
        acquisition_value = asset.acquisition_value
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
        acquisition_value = asset.acquisition_value
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

    def same_ratio_method(acquisition_value, dep_ratio_base, guaranteed_amount, dep_ratio_revised)
      # ロジック
      # ①簿価1円超なら計算を回す
      #   ②通常計算償却費が保証価格より多きければ通常計算を回す
      #     （②に該当しない場合）
      #     ③改定取得価格が決まってない時は初年度なので改定取得価格と残り期間償却費を設定する
      #     ④③で設定した償却費だと償却超過を起こす場合は簿価を1円残すようにする
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

end
