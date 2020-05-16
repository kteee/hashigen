class Asset < ApplicationRecord

  # concernの読み込み
  include AssetAcquisition
  include AssetDepreciation

  # relations
  belongs_to :account
  belongs_to :asset_item
  belongs_to :depreciation_method
  belongs_to :location
  has_many :transactions

  # validations
  validate :depreciation_start_date_cannot_be_before_acquisition_date
  validate :depreciation_start_date_cannot_be_before_current_period

  # validation methods
  def depreciation_start_date_cannot_be_before_acquisition_date
    if acquisition_date > depreciation_start_date then
      errors.add(:depreciation_start_date, 'は取得日以前の日付にすることはできません')
    end
  end

  def depreciation_start_date_cannot_be_before_current_period
    if account.get_current_period[:start] > depreciation_start_date then
      errors.add(:depreciation_start_date, 'は当会計年度の期首日以前の日付にすることはできません')
    end
  end

  # custom methods
  class << self

    def make_all_assets_list(account_id)
      assets = self.where(account_id: account_id)
       all_items_list = assets.map do |asset|
        {
          id: asset.id, 
          name: asset.name,
          acquisition_date: asset.acquisition_date,
          acquisition_value: asset.acquisition_value.to_s(:delimited),
          useful_life: asset.asset_item.useful_life.year,
          depreciation_method: asset.depreciation_method.display_name,
          # created_at: asset.created_at.strftime("%Y-%m-%d"),
          updated_at: asset.updated_at.strftime("%Y-%m-%d")
        }
      end
      { assets: all_items_list }
    end

  end

end
