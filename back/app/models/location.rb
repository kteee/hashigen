class Location < ApplicationRecord
  # relations
  has_many :assets

  # scopes
  # class methods
  class << self
    def get_10_locations_by(key_word)
      locations = self.ransack(prefecture_or_city_or_prefecture_kana_or_city_kana_cont: key_word).
        result.select("id", "code", "prefecture", "city").limit(10).map { |location| {
          value: location.code,
          label: "#{location.code} | #{location.prefecture} | #{location.city}"
        }}
    end
  end
end