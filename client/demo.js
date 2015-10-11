/**
 * @file
 * Based on the JS code in the MapJS test/index.html file.
 */

var initDemoFunctions = function () {
  jQuery.fn.attachmentEditorWidget = function (mapModel) {
    'use strict';
    return this.each(function () {
      var element = jQuery(this);
      mapModel.addEventListener('attachmentOpened', function (nodeId, attachment) {
        mapModel.setAttachment(
          'attachmentEditorWidget',
          nodeId, {
            contentType: 'text/html',
            content: prompt('attachment', attachment && attachment.content)
          }
        );
      });
    });
  };
};


var observer = function () {
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

};

var modelCreator = function () {
  initDemoFunctions();

  window.onerror = alert;
  var container = jQuery('#container');
  var tree = test_tree();
  var idea = MAPJS.content(tree);
  var imageInsertController = new MAPJS.ImageInsertController("http://localhost:4999?u=");
  mapModel = new MAPJS.MapModel(MAPJS.DOMRender.layoutCalculator, []);

  container.domMapWidget(console, mapModel, false, imageInsertController);
  jQuery('body').mapToolbarWidget(mapModel);
  jQuery('body').attachmentEditorWidget(mapModel);
  $("[data-mm-action='export-image']").click(function () {
    MAPJS.pngExport(idea).then(function (url) {
      window.open(url, '_blank');
    });
  });
  mapModel.setIdea(idea);
  jQuery('#linkEditWidget').linkEditWidget(mapModel);
  window.mapModel = mapModel;
  jQuery('.arrow').click(function () {
    jQuery(this).toggleClass('active');
  });
  imageInsertController.addEventListener('imageInsertError', function (reason) {
    console.log('image insert error', reason);
  });
  container.on('drop', function (e) {
    var dataTransfer = e.originalEvent.dataTransfer;
    e.stopPropagation();
    e.preventDefault();
    if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
      var fileInfo = dataTransfer.files[0];
      if (/\.mup$/.test(fileInfo.name)) {
        var oFReader = new FileReader();
        oFReader.onload = function (oFREvent) {
          mapModel.setIdea(MAPJS.content(JSON.parse(oFREvent.target.result)));
        };
        oFReader.readAsText(fileInfo, 'UTF-8');
      }
    }
  });

  observer();
};

Meteor.startup(function () {
  setTimeout(modelCreator, 1000)
});
