console.log("JavaScript file is loaded successfully.");

fetch('/staff-workmode-data/')
    .then(response => {
        console.log('Fetching data from /staff-workmode-data/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data fetched successfully:', data);

        // Set today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to the start of today
        console.log('Today\'s date:', today);

        // Loop through each staff member
        data.forEach(staff => {
            console.log('Processing staff:', staff.staff_name);

            // Create the container for the chart
            const container = document.createElement('div');
            container.classList.add('chart-container'); // Add chart container class

            // Create the canvas for the chart
            const canvas = document.createElement('canvas');
            canvas.id = `${staff.staff_name.replace(/\s+/g, '-')}-chart`; // Unique ID for each canvas
            container.appendChild(canvas);

            // Create and append the title for the staff name
            const title = document.createElement('h2');
            title.innerText = staff.staff_name; // Set the staff name as the title
            title.classList.add('chart-title'); // Optional: add a class for styling
            container.appendChild(title); // Append title below the chart

            // Append the chart container to the main container
            document.getElementById('chartsContainer-staff-3').appendChild(container);

            // Filter work modes for today only
            const filteredWorkModes = Object.keys(staff.work_modes)
                .filter(date => {
                    const workModeDate = new Date(date);
                    return workModeDate.getTime() === today.getTime();
                })
                .reduce((obj, key) => {
                    obj[key] = staff.work_modes[key];
                    return obj;
                }, {});

            console.log('Filtered work modes for today:', filteredWorkModes);

            // Prepare data for the chart
            const workModeLabels = Object.keys(filteredWorkModes);
            const workModeCounts = Object.values(filteredWorkModes);

            // Log the labels and counts
            console.log('Work Mode Labels:', workModeLabels);
            console.log('Work Mode Counts:', workModeCounts);

            // Generate the chart
            const ctx = canvas.getContext('2d');
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

            console.log('Chart rendered for:', staff.staff_name);
        });
    })
    .catch(error => {
        console.error("Error fetching staff workmode data:", error);
    });
