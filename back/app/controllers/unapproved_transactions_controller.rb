class UnapprovedTransactionsController < ApplicationController
  before_action :authenticate

  def index
    get_request_response_success(Transaction.get_unapproved(@current_account.id))
  end

end
