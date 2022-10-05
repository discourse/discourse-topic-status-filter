const enabledCategoryIds = settings.enabled_categories
  .split("|")
  .filter(Boolean)
  .map((id) => parseInt(id, 10));

export default {
  setupComponent(args, component) {
    // Unfortunately `shouldRender` is not re-evaluated when the arguments change.
    // This is a workaround to set `display: none` when the connector is not required.
    component.classNameBindings = ["hidden"];
    component.didReceiveAttrs = function () {
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
  },
};
