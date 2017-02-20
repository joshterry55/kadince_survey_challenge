require 'test_helper'

class Api::ColorOptionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_color_options_index_url
    assert_response :success
  end

  test "should get show" do
    get api_color_options_show_url
    assert_response :success
  end

  test "should get new" do
    get api_color_options_new_url
    assert_response :success
  end

  test "should get edit" do
    get api_color_options_edit_url
    assert_response :success
  end

end
