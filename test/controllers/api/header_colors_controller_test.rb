require 'test_helper'

class Api::HeaderColorsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_header_colors_index_url
    assert_response :success
  end

  test "should get show" do
    get api_header_colors_show_url
    assert_response :success
  end

  test "should get edit" do
    get api_header_colors_edit_url
    assert_response :success
  end

end
