require 'test_helper'

class Api::AnimalTypesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_animal_types_index_url
    assert_response :success
  end

  test "should get show" do
    get api_animal_types_show_url
    assert_response :success
  end

  test "should get new" do
    get api_animal_types_new_url
    assert_response :success
  end

  test "should get edit" do
    get api_animal_types_edit_url
    assert_response :success
  end

end
