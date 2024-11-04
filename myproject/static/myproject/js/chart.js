function fetchDataAndUpdateChart(chart) {
    fetch("/attendance-chart-data/")
        .then(response => response.json())
        .then(data => {
            chart.data.labels = data.labels;
            chart.data.datasets[0].data = data.data;
            chart.update();
        });
}

// Fetch the data from the server and create the chart
fetch("/attendance-chart-data/")
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('attendanceChart').getContext('2d');
        const attendanceChart = new Chart(ctx, {
            type: 'pie',  // Change 'doughnut' to 'pie'
            data: {
                labels: data.labels,  // e.g., ['Onsite', 'Offsite', 'WFH', 'Leave', 'Travel']
                datasets: [{
                    label: 'Attendance Type',
                    data: data.data,  // e.g., [15, 8, 5, 12, 3]
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(255, 205, 86, 0.6)',
                        'rgba(201, 203, 207, 0.6)',
                        'rgba(54, 162, 235, 0.6)'
                    ],
                    hoverBackgroundColor: [
                        'rgba(255, 159, 64, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(255, 205, 86, 0.8)',
                        'rgba(201, 203, 207, 0.8)',
                        'rgba(54, 162, 235, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 205, 86, 1)',
                        'rgba(201, 203, 207, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 2,
                    hoverOffset: 8  // Creates a 3D-like separation effect on hover
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'OVERALL WORKMODE DATA'  // Add your title text here
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });

        // Update the chart every 5 seconds
        setInterval(() => fetchDataAndUpdateChart(attendanceChart), 5000);
    });
