fetch('/staff-workmode-data/')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(staff => {
            const container = document.createElement('div');
            container.classList.add('chart-container'); // Add chart container class

            const canvas = document.createElement('canvas');
            canvas.id = `${staff.staff_name.replace(/\s+/g, '-')}-chart`; // Unique ID for each canvas
            container.appendChild(canvas);

            // Create a title element for the staff name
            const title = document.createElement('h2');
            title.innerText = staff.staff_name; // Set the staff name as the title
            title.classList.add('chart-title'); // Optional: add a class for styling
            
            // Append the canvas first and the title below it
            container.appendChild(canvas);
            container.appendChild(title); // Append title below the chart

            document.getElementById('chartsContainer-staff').appendChild(container); // Append to the main container

            // Generate the chart
            const ctx = canvas.getContext('2d');
            const workModeLabels = Object.keys(staff.work_modes);
            const workModeCounts = Object.values(staff.work_modes);

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: workModeLabels,
                    datasets: [{
                        label: 'Attendance Count',
                        data: workModeCounts,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
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
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Work Modes'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Count'
                            }
                        }
                    }
                }
            });
        });
    })
    .catch(error => {
        console.error("Error fetching staff workmode data:", error);
    });
