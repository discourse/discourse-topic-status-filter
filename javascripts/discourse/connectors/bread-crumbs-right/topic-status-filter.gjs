import Component from "@ember/component";
import { classNames, tagName } from "@ember-decorators/component";
import TopicStatusFilter0 from "../../components/topic-status-filter";

const enabledCategoryIds = settings.enabled_categories
  .split("|")
  .filter(Boolean)
  .map((id) => parseInt(id, 10));

@tagName("li")
@classNames("bread-crumbs-right-outlet", "topic-status-filter")
export default class TopicStatusFilterConnector extends Component {
  init() {
    super.init(...arguments);
    // Unfortunately `shouldRender` is not re-evaluated when the arguments change.
    // This is a workaround to set `display: none` when the connector is not required.
    this.classNameBindings = ["hidden"];
    this.didReceiveAttrs = function () {
      if (enabledCategoryIds.length === 0) {
        this.set("hidden", false);
      } else if (
        this.currentCategory &&
        enabledCategoryIds.includes(this.currentCategory.id)
      ) {
        this.set("hidden", false);
      } else {
        this.set("hidden", true);
      }
      this._super();
    };
  }

  <template><TopicStatusFilter0 /></template>
}
