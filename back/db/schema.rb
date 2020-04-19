# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_19_062704) do

  create_table "asset_groups", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "asset_type_id"
    t.index ["asset_type_id"], name: "index_asset_groups_on_asset_type_id"
  end

  create_table "asset_items", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "asset_group_id"
    t.text "item"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "useful_life_id"
    t.index ["asset_group_id"], name: "index_asset_items_on_asset_group_id"
    t.index ["useful_life_id"], name: "index_asset_items_on_useful_life_id"
  end

  create_table "asset_types", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "assets", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.date "acquisition_date"
    t.integer "acquisition_value"
    t.bigint "asset_item_id"
    t.bigint "depreciation_method_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["asset_item_id"], name: "index_assets_on_asset_item_id"
    t.index ["depreciation_method_id"], name: "index_assets_on_depreciation_method_id"
  end

  create_table "depreciation_methods", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "display_name"
  end

  create_table "useful_lives", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "year"
    t.float "old_same_amount"
    t.float "old_same_ratio"
    t.float "new_same_amount"
    t.float "two_five_zero_same_ratio_base"
    t.float "two_five_zero_same_ratio_revised"
    t.float "two_five_zero_same_ratio_guaranteed"
    t.float "two_zero_zero_same_ratio_base"
    t.float "two_zero_zero_same_ratio_revised"
    t.float "two_zero_zero_same_ratio_guaranteed"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "asset_groups", "asset_types"
  add_foreign_key "asset_items", "asset_groups"
  add_foreign_key "asset_items", "useful_lives"
  add_foreign_key "assets", "asset_items"
  add_foreign_key "assets", "depreciation_methods"
end
