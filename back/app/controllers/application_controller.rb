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
      book_value = asset.acquisition_value
      result = []
      year = 1
      dep_ratio_base = dep_ratios.two_zero_zero_same_ratio_base
      guaranteed_amount = asset.acquisition_value * dep_ratios.two_zero_zero_same_ratio_guaranteed
      dep_ratio_revised = dep_ratios.two_zero_zero_same_ratio_revised
      while book_value > guaranteed_amount do
        depreciation = book_value * dep_ratio_base
        result.push({
          year: year,
          amount: depreciation
        })
        year += 1
        book_value -= depreciation
      end
      puts result

    elsif dep_method == 3 then
      book_value = asset.acquisition_value
      result = []
      year = 1
      dep_ratio_base = dep_ratios.two_five_zero_same_ratio_base
      guaranteed_amount = asset.acquisition_value * dep_ratios.two_five_zero_same_ratio_guaranteed
      dep_ratio_revised = dep_ratios.two_five_zero_same_ratio_revised
      while book_value > guaranteed_amount do
        depreciation = book_value * dep_ratio_base
        result.push({
          year: year,
          amount: depreciation
        })
        year += 1
        book_value -= depreciation
      end
      puts result
    
    else
      puts '開発中'

    end
  end

  def response_get_success(response_item)
    render status: 200, json: { status: 200, data: response_item }
  end

  def response_post_success
    render status: 201, json: { status: 201, message: 'Successfully created!'}
  end

  def response_error
    render status: 400, json: { status: 400, message: 'something went wrong' }
  end
end
