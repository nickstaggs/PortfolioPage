angular.module('ResumeCtrl', []).controller('ResumeController', function() {
  PDFObject.embed("/documents/Nick_Staggs_Resume.pdf", "#pdfRenderer");
})
