class AssetDepreciationController < ApplicationController
  before_action :validate_token

  def show
    ids_str =  params["q"].split(',')
    ids = ids_str.map { |id| id.to_i }
    transactions = Transaction.where(transaction_type_id: 2, status: 0, monthly_period_id: ids ).
      select(:id, :asset_id, :amount, :date)
    response_transactions = transactions.map do |transaction|
      {
        id: transaction.id,
        date: transaction.date,
        asset_name: transaction.asset.name,
        amount: transaction.amount
      }
    end
    get_request_response_success(response_transactions)
  end

  def create
    params[:_json].each do |item|
      transaction = Transaction.find(item[:id])
      transaction.status = Transaction.statuses[:monthly_closed]
      transaction.save
    end
    post_request_response_success('finished')
  end

end
