(function() {
  'use strict';

  angular
    .module('app.resume')
    .controller('ResumeController', ResumeController);

    function ResumeController() {
      PDFObject.embed("/documents/Nick_Staggs_Resume.pdf", "#pdfRenderer");
    }
})();
