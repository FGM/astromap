
$(function () {
  var events = [
    'activatedNodesChanged',
    'activedNodesChanged',
    'addLinkModeToggled',
    'attachmentOpened',
    'connectorCreated',
    'connectorRemoved',
    'contextMenuRequested',
    'inputEnabledChanged',
    'layoutChangeComplete',
    'layoutChangeStarting',
    'linkAttrChanged',
    'linkCreated',
    'linkRemoved',
    'linkSelected',
    'mapMoveRequested',
    'mapScaleChanged',
    'mapViewResetRequested',
    'nodeAttrChanged',
    'nodeCreated',
    'nodeEditRequested',
    'nodeFocusRequested',
    'nodeIconEditRequested',
    'nodeLabelChanged',
    'nodeMoved',
    'nodeRemoved',
    'nodeSelectionChanged',
    'nodeTitleChanged'
  ];

  /**
   *
   * @param e
   * @param mixed params
   *   - node id: nodeSelectionChanged,
   *   - [node ids]: activatedNodesChanged
   *   - -1: layoutChangeStarting
   *   - { from: nid1, to: nid2 }: connectorRemoved
   *   - undefined: layoutChangeComplete
   */
  var observer = function (eventName, params) {
    console.log(eventName, "on: ", params);
  };

  events.forEach(function (eventname) {
    mapModel.addEventListener(eventname, function (id) { observer(eventname, id); });
  });

});
