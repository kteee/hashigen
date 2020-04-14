require 'test_helper'

class AssetsControllerTest < ActionDispatch::IntegrationTest
  test "should get list" do
    get assets_list_url
    assert_response :success
  end

  test "should get create" do
    get assets_create_url
    assert_response :success
  end

  test "should get retrieve" do
    get assets_retrieve_url
    assert_response :success
  end

  test "should get update" do
    get assets_update_url
    assert_response :success
  end

  test "should get destroy" do
    get assets_destroy_url
    assert_response :success
  end

end
