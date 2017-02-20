require 'test_helper'

class Api::AnimalHeaderColorsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_animal_header_colors_index_url
    assert_response :success
  end

  test "should get show" do
    get api_animal_header_colors_show_url
    assert_response :success
  end

  test "should get edit" do
    get api_animal_header_colors_edit_url
    assert_response :success
  end

end
