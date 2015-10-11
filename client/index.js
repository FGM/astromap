var fetchLatestEvent = function () {
};

Template.diag.helpers({
  latestEvent: function () {
    var result = MapEvents.findOne({}, {_id: -1});
    if (result === undefined) {
      result = {
        name: "No current event",
        args: "No current args"
      }
    }
    else {
    }
    return result;
  }
});
