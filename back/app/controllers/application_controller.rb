class ApplicationController < ActionController::API

  def dep_simulation(asset)
    useful_life = asset.asset_item.useful_life.id
    dep_ratios = UsefulLife.find(useful_life)
    dep_method =  asset.depreciation_method.id
    # 1 two_zero_zero_same_ratio 200%定率法
    # 2 new_same_amount 新定額法
    # 3 two_five_zero_same_ratio 250%定率法
    # 4 old_same_amount 旧定額法
    # 5 old_same_ratio  旧定率法
    if dep_method == 1 then
      acquisition_value = asset.acquisition_value
      dep_ratio_base = dep_ratios.two_zero_zero_same_ratio_base
      guaranteed_amount = asset.acquisition_value * dep_ratios.two_zero_zero_same_ratio_guaranteed
      dep_ratio_revised = dep_ratios.two_zero_zero_same_ratio_revised
      same_ratio_method(acquisition_value, dep_ratio_base, guaranteed_amount, dep_ratio_revised)

    elsif dep_method == 3 then
      acquisition_value = asset.acquisition_value
      dep_ratio_base = dep_ratios.two_five_zero_same_ratio_base
      guaranteed_amount = asset.acquisition_value * dep_ratios.two_five_zero_same_ratio_guaranteed
      dep_ratio_revised = dep_ratios.two_five_zero_same_ratio_revised
      same_ratio_method(acquisition_value, dep_ratio_base, guaranteed_amount, dep_ratio_revised)
    
    else
      puts '開発中'
    
    end # end of if statement
  end # end of method

  def response_get_success(response_item)
    render status: 200, json: { status: 200, data: response_item }
  end

  def response_post_success
    render status: 201, json: { status: 201, message: 'Successfully created!'}
  end

  def response_error
    render status: 400, json: { status: 400, message: 'something went wrong' }
  end


  public # 定額法と定率法の共通部分をここで定義
  def same_ratio_method(acquisition_value, dep_ratio_base, guaranteed_amount, dep_ratio_revised)
    book_value = acquisition_value
    acquisition_value_revised = 0 # 改定取得価格
    depreciation_rest = 0 # 改定後償却
    result = []
    year = 1
    while book_value > 0 do
      depreciation = book_value * dep_ratio_base
      if depreciation > guaranteed_amount then
        result.push({
          year: year,
          amount: depreciation
        })
        year += 1
        book_value -= depreciation
      elsif acquisition_value_revised == 0 then
        acquisition_value_revised = book_value
        depreciation_rest = acquisition_value_revised * dep_ratio_revised
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
    result
  end

end
