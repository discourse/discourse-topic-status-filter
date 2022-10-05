import DiscourseUrl from "discourse/lib/url";

export default {
  shouldRender(args, component) {
    const ids = settings.enabled_categories.split("|").filter((n) => n);

    if (ids.length == 0) {
      return true;
    }

    const category = component.get("parentView.category");
    if (category) {
      return ids.includes(category.id.toString());
    }

    return false;
  },

  setupComponent(args, component) {
    const statuses = ["all", "open", "closed"].map((status) => {
      return {
        name: I18n.t(themePrefix(`topic_status_filter.${status}`)),
        value: status,
      };
    });
    component.set("statuses", statuses);

    const queryStrings = window.location.search;
    if (queryStrings.match(/status=open/)) {
      component.set("status", "open");
    } else if (queryStrings.match(/status=closed/)) {
      component.set("status", "closed");
    } else {
      component.set("status", "all");
    }
  },

  actions: {
    changeStatus(newStatus) {
      let location = window.location;
      let queryStrings = location.search;
      let params = queryStrings.startsWith("?")
        ? queryStrings.substr(1).split("&")
        : [];

      params = params.filter((param) => {
        return !param.startsWith("status=");
      });

      if (newStatus && newStatus !== "all") {
        params.push(`status=${newStatus}`);
      }

      queryStrings = params.length > 0 ? `?${params.join("&")}` : "";
      DiscourseUrl.routeTo(
        `${location.pathname}${queryStrings}${location.hash}`
      );
    },
  },
};
