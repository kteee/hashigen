class Asset < ApplicationRecord

  # concernの読み込み
  include AssetAcquisition
  include AssetDepreciation

  # relations
  belongs_to :account
  belongs_to :asset_item
  belongs_to :depreciation_method
  belongs_to :location
  has_many :transactions, dependent: :destroy

  # normal validations
  validates :name, :acquisition_date, :acquisition_value,
    :asset_item_id, :depreciation_method_id, :account_id,
    :year_start_book_value, :depreciation_start_date, :location_id,
    :unit_value, :amount, presence: true
  validates :acquisition_value, :year_start_book_value, :unit_value,
    :amount, numericality: { greater_than: 0 }

  # custom validations
  validate :depreciation_start_date_cannot_be_before_acquisition_date
  # validate :depreciation_start_date_cannot_be_before_current_period

  # validation methods
  def depreciation_start_date_cannot_be_before_acquisition_date
    if acquisition_date > depreciation_start_date then
      errors.add(:depreciation_start_date, 'は取得日以前の日付にすることはできません')
    end
  end

  # def depreciation_start_date_cannot_be_before_current_period
  #   puts 
  #   if account.get_current_period[:start] > depreciation_start_date then
  #     errors.add(:depreciation_start_date, 'は当会計年度の期首日以前の日付にすることはできません')
  #   end
  # end

  # custom method
  def get_detail
    custom_txns = self.transactions.map do |txn|
      {
        value: txn.value,
        date: txn.exec_date,
        status: txn.status,
        transaction_type: txn.transaction_type.display_name
      }
    end

    {
      detail: {
        acquisition_date: self.acquisition_date,
        acquisition_value: self.acquisition_value,
        depreciation_start_date: self.depreciation_start_date,
        id: self.id,
        prefecture: self.location.prefecture,
        city: self.location.city,
        name: self.name,
        year_start_book_value: self.year_start_book_value,
        created_at: self.created_at.strftime("%Y-%m-%d"),
        updated_at: self.updated_at.strftime("%Y-%m-%d")
      },
      transactions: custom_txns,
      accounting: {
        dep_method: self.depreciation_method,
        asset_type: self.asset_item.asset_group.asset_type,
        asset_group: self.asset_item.asset_group,
        asset_item: self.asset_item
      }
    }
  end

  # scope
  scope :filter_account, -> (account_id) { where(account_id: account_id) }
  scope :filter_dep_method, -> (dep_method_id) { where(depreciation_method_id: dep_method_id) }
  scope :filter_asset_group, -> (asset_group_id) { eager_load(asset_item: :asset_group).where(asset_groups: {id: asset_group_id}) }
  
  # class methods
  class << self
    def get_list(account_id, params)
      assets = Asset.filter_account(account_id)
      assets = params[:depreciation_method_id] ? assets.filter_dep_method(params[:depreciation_method_id]) : assets
      assets = params[:asset_group_id] ? assets.filter_asset_group(params[:asset_group_id]) : assets
      list = assets.map { |asset| {
        id: asset.id, 
        name: asset.name,
        acquisition_date: asset.acquisition_date,
        acquisition_value: asset.acquisition_value,
        useful_life: asset.asset_item.useful_life.year,
        depreciation_method: asset.depreciation_method.display_name,
        created_at: asset.created_at.strftime("%Y-%m-%d"),
        updated_at: asset.updated_at.strftime("%Y-%m-%d")
      }} 
    end
  end

end