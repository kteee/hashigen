class Account < ApplicationRecord
  has_many :accounting_periods
  has_many :monthly_periods
  has_many :users
  has_many :assets

  def make_basic_info
    basic_info = {
      name: self.name,
      start: self.get_current_period[:start],
      end: self.get_current_period[:end]
    }
    basic_info
  end

  def get_current_period
    current_period = {}
    self.accounting_periods.each do |period|
      puts period.status
      if period.status == 0 then
        current_period = { start: Date.parse(period.start), end: Date.parse(period.end) }
        break
      end
    end
    current_period
  end
  
end
