require 'test_helper'

class MastersControllerTest < ActionDispatch::IntegrationTest
  test "should get list" do
    get masters_list_url
    assert_response :success
  end

  test "should get create" do
    get masters_create_url
    assert_response :success
  end

  test "should get retrieve" do
    get masters_retrieve_url
    assert_response :success
  end

  test "should get update" do
    get masters_update_url
    assert_response :success
  end

  test "should get destroy" do
    get masters_destroy_url
    assert_response :success
  end

end
