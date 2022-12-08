// const app = angular.module('SCHOOL-SITE-CLIENT', ['zingchart-angularjs']);
//
// app.controller('AnalyticController', function($scope) {
//
//   $scope.myJson = {
//     globals: {
//       shadow: false,
//       fontFamily: "Verdana",
//       fontWeight: "100"
//     },
//     type: "pie",
//     backgroundColor: "#fff",
//
//     legend: {
//       layout: "x5",
//       position: "50%",
//       borderColor: "transparent",
//       marker: {
//         borderRadius: 10,
//         borderColor: "transparent"
//       }
//     },
//     tooltip: {
//       text: "%v requests"
//     },
//     plot: {
//       refAngle: "-90",
//       borderWidth: "0px",
//       valueBox: {
//         placement: "in",
//         text: "%npv %",
//         fontSize: "15px",
//         textAlpha: 1,
//       }
//     },
//     series: [{
//       text: "10.0.0.80",
//       values: [4660],
//       backgroundColor: "#FA6E6E #FA9494",
//     }, {
//       text: "167.114.156.198",
//       values: [1807],
//       backgroundColor: "#F1C795 #feebd2"
//     }, {
//       text: "103.24.77.25",
//       values: [1611],
//       backgroundColor: "#FDAA97 #FC9B87"
//     }, {
//       text: "46.4.68.142",
//       values: [1341],
//       backgroundColor: "#28C2D1"
//     }, {
//       text: "10.0.0.117",
//       values: [1269],
//       backgroundColor: "#D2D6DE",
//     }]
//   };
// });
//
//
// var canvas = document.getElementById("can");
// var ctx = canvas.getContext("2d");
// var lastend = 0;
// var data = [200, 60, 15]; // If you add more data values make sure you add more colors
// var myTotal = 0; // Automatically calculated so don't touch
// var myColor = ["red", "green", "blue"]; // Colors of each slice
//
// for (var e = 0; e < data.length; e++) {
//   myTotal += data[e];
// }
//
// for (var i = 0; i < data.length; i++) {
//   ctx.fillStyle = myColor[i];
//   ctx.beginPath();
//   ctx.moveTo(canvas.width / 2, canvas.height / 2);
//   ctx.arc(
//     canvas.width / 2,  // x
//     canvas.height / 2, // y
//     canvas.height / 2, // radius
//     lastend,           // startingAngle (radians)
//     lastend + Math.PI * 2 * (data[i] / myTotal), // endingAngle (radians)
//     false // antiClockwise (boolean)
//   );
//   ctx.lineTo(canvas.width / 2, canvas.height / 2);
//   ctx.fill();
//   lastend += Math.PI * 2 * (data[i] / myTotal);
// }

