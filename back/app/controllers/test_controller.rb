class TestController < ApplicationController
  def index
    all = UsefulLife.all
    render :json => {data: all}
  end
end
