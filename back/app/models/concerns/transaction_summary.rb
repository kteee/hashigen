module TransactionSummary
  extend ActiveSupport::Concern

    # scopes
    included do
      scope :filter_account, -> (account_id) { eager_load(asset: :account).where(accounts: {id: account_id}) }
      scope :left_join_transaction_types, -> { eager_load(:transaction_type) }
      scope :group_transaction_types_and_statuses, -> { group(:txn_date, 'transaction_types.name', :status) }
      scope :order_by_txn_date, -> { order(:txn_date) }
      scope :sum_by_value, -> { sum(:value) }
    end
  
    # class methods
    module ClassMethods
      def get_summary(account_id)
        txns = self.filter_account(account_id).left_join_transaction_types
        summary_raw = txns.group_transaction_types_and_statuses.order_by_txn_date.sum_by_value
        summary = []
        summary_raw.each do |key, val|
          # summaryには年度をハッシュキーとして、その下にデータを配列でぶら下げる
          # -1でとったsummaryのハッシュのキーが今回入れようとしているものなら、そのハッシュに値を追加でもたせる
          new_item_outer = {}
          new_item_inner = {
            type: key[1],
            status: key[2],
            value: val
          }
          if summary[-1]
            if summary[-1].keys[0] == key[0].strftime("%Y-%m-%d")
              summary[-1][key[0].strftime("%Y-%m-%d")].push(new_item_inner)
            else
              new_item_outer[key[0].strftime("%Y-%m-%d")] = [new_item_inner]
              summary.push(new_item_outer)
            end
          else
            new_item_outer[key[0].strftime("%Y-%m-%d")] = [new_item_inner]
            summary.push(new_item_outer)
          end
        end
        summary
      end
    end
end