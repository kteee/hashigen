module TransactionApproval
  extend ActiveSupport::Concern

  included do
    scope :left_join_tables, -> { eager_load(:transaction_type, monthly_period: :accounting_period) }
    scope :filter_conditions, -> (account_id) { where(accounting_periods: { account_id: account_id, status: 0 }, status: 0) }
    scope :group_by_fields, -> { group('monthly_periods.end', 'transaction_types.name') }
    scope :count_transactions, -> { count(:id) }
  end

  module ClassMethods
    def get_unapproved(account_id)
      count_base = self.left_join_tables.filter_conditions(account_id).group_by_fields.count_transactions
      count = []
      count_base.each do |key, val|
        pushing_item_outer = {}
        pushing_item_inner = { type: key[1], count: val }
        if count.length > 0
          if count[-1].keys[0] == key[0].strftime("%Y-%m-%d")
            count[-1][key[0].strftime("%Y-%m-%d")].push(pushing_item_inner)
          else
            pushing_item_outer[key[0].strftime("%Y-%m-%d")] = [pushing_item_inner]
            count.push(pushing_item_outer)  
          end
        else
          pushing_item_outer[key[0].strftime("%Y-%m-%d")] = [pushing_item_inner]
          count.push(pushing_item_outer)
        end
      end
      count
    end
  end

end