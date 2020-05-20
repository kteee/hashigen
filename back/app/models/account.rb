class Account < ApplicationRecord

  enum round_config: {
    rounddown: 0,
    roundup: 1,
    roundoff: 2
  }

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
  end

  def get_current_period
    current_period = {}
    self.accounting_periods.each do |period|
      if period.status == 0 then
        current_period = { start: period.start, end: period.end }
        break
      end
    end
    current_period
  end
  
end
