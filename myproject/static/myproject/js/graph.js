// Fetch data for different work modes and generate charts
const workModes = ['Onsite', 'Offsite', 'WFH', 'Leave', 'Travel'];  // Define the work modes

workModes.forEach(workMode => {
    fetch(`/attendance-chart-data/${workMode}/`)
    .then(response => response.json())
    .then(data => {
        // Create a canvas element for each work mode chart
        const container = document.createElement('div');
        container.classList.add('chart-container');
        
        const canvas = document.createElement('canvas');
        canvas.id = `${workMode}-chart`;
        container.appendChild(canvas);

        // Append the container to the flexbox container
        document.getElementById('chartsContainer').appendChild(container);

        // Generate the chart
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',  // Use a bar chart for better readability with names
            data: {
                labels: data.labels,  // Staff names
                datasets: [{
                    label: `${workMode} Attendance Count`,
                    data: data.data,   // Count of times they were in this work mode
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Staff Names'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Count of Work Mode'
                        }
                    }
                }
            }
        });
    });
});
