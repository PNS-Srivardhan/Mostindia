// Fetch the data from the server
fetch("/attendance-chart-data/")
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('attendanceChart').getContext('2d');
        const attendanceChart = new Chart(ctx, {
            type: 'pie',  // You can change the chart type here (pie, bar, etc.)
            data: {
                labels: data.labels,  // e.g., ['Onsite', 'Offsite', 'WFH', 'Leave', 'Travel']
                datasets: [{
                    label: 'Attendance Type',
                    data: data.data,  // e.g., [15, 8, 5, 12, 3]
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
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
                }
            }
        });
    });
