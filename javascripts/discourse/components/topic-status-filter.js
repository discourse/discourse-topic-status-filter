import Component from "@glimmer/component";
import I18n from "I18n";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";

export default class TopicStatusFilterComponenent extends Component {
  @service router;

  get statuses() {
    return ["all", "open", "closed"].map((status) => {
      return {
        name: I18n.t(themePrefix(`topic_status_filter.${status}`)),
        value: status,
      };
    });
  }

  get status() {
    const currentStatus =
      this.router.currentRoute.attributes?.modelParams?.status;
    if (["open", "closed"].includes(currentStatus)) {
      return currentStatus;
    } else {
      return "all";
    }
  }

  @action
  changeStatus(newStatus) {
    this.router.transitionTo({ queryParams: { status: newStatus } });
  }
}