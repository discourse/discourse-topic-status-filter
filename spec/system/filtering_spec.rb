# frozen_string_literal: true

RSpec.describe "Topic status filtering" do
  fab!(:theme) { upload_theme_component }
  fab!(:open_topic) { Fabricate(:topic, title: "This topic is open for discussion") }
  fab!(:closed_topic) { Fabricate(:topic, title: "This topic is closed already", closed: true) }

  let(:topic_list) { PageObjects::Components::TopicList.new }

  before { sign_in(Fabricate(:admin)) }

  def status_filter
    PageObjects::Components::SelectKit.new(".topic-status-filter-dropdown")
  end

  it "filters topics by open and closed status" do
    visit("/latest")

    expect(topic_list).to have_topic(open_topic)
    expect(topic_list).to have_topic(closed_topic)

    status_filter.expand
    status_filter.select_row_by_value("closed")

    expect(topic_list).to have_topic(closed_topic)
    expect(topic_list).to have_no_topic(open_topic)

    status_filter.expand
    status_filter.select_row_by_value("open")

    expect(topic_list).to have_topic(open_topic)
    expect(topic_list).to have_no_topic(closed_topic)

    status_filter.expand
    status_filter.select_row_by_value("all")

    expect(topic_list).to have_topic(open_topic)
    expect(topic_list).to have_topic(closed_topic)
  end
end
