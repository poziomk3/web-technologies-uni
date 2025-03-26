function showPhoneNumber(buttonId) {
    let button = document.getElementById(buttonId);
    let originalText = button.innerText;

    button.innerText = "+48 123 456 789"; 

    setTimeout(function() {
      button.innerText = originalText;
    }, 5000);
  }
const ctx = document.getElementById("travelChart").getContext('2d');
const myChart = new Chart(ctx, {
    type: 'pie', data: {
        labels: ["Grecja", "Bułgaria", "Hiszpania", "Chorwacja", "Francja"],
        datasets: [{
            data: [720000, 260000, 840000, 494700, 312406],
            backgroundColor: ["#e6a1ef", "#ff0087", "#89e0ff", "#3c000b", "#ff0038"]
        }]
    },
    options: {
        title: {
          display: true,
          text: "Najpopularniejsze kierunki podróży"
        }
      }
});