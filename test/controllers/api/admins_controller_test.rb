require 'test_helper'

class Api::AdminsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_admins_index_url
    assert_response :success
  end

  test "should get show" do
    get api_admins_show_url
    assert_response :success
  end

  test "should get new" do
    get api_admins_new_url
    assert_response :success
  end

  test "should get edit" do
    get api_admins_edit_url
    assert_response :success
  end

end
