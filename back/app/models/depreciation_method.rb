class DepreciationMethod < ApplicationRecord
  # relations
  has_many :assets

  # scopes
  
  # class methods
  class << self
    def get_list
      list = self.all.map {|method| {
        value: method.id,
        label: method.display_name
      }}
    end
  end

end
