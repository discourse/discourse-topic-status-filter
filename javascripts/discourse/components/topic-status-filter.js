import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import I18n from "I18n";

export default class TopicStatusFilterComponent extends Component {
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
    const routeAttributes = this.router.currentRoute.attributes;
    let currentStatus;

    currentStatus = routeAttributes?.modelParams?.status; // Regular topic lists
    currentStatus ??= routeAttributes?.list?.listParams?.status; // Tag topic lists

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
