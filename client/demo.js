/**
 * @file
 * Based on the JS code in the MapJS test/index.html file.
 */

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

Meteor.startup(function () {
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
    e.preventDefault()  ;
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
});
