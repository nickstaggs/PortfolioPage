angular.module('ResumeCtrl', []).controller('ResumeController', function($scope) {
  PDFObject.embed("/documents/Nick_Staggs_Resume.pdf", "#pdfRenderer");
})
