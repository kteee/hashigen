class TransactionsController < ApplicationController
  before_action :authenticate

  def index
    get_request_response_success(Transaction.get_summary(@current_account.id))
  end

end
