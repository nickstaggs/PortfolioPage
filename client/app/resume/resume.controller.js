angular.module('resumeCtrl', []).controller('ResumeController', function() {
  PDFObject.embed("/documents/Nick_Staggs_Resume.pdf", "#pdfRenderer");
})
