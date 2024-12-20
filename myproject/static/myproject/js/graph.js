// Define work modes and colors
const workModes = ['Onsite', 'Offsite', 'WFH', 'Leave', 'Travel',  'Others', 'Paid_leave'];

const colors = {
    'Onsite': { backgroundColor: 'rgba(255, 99, 132, 0.2)', borderColor: 'rgba(255, 99, 132, 1)' },
    'Offsite': { backgroundColor: 'rgba(54, 162, 235, 0.2)', borderColor: 'rgba(54, 162, 235, 1)' },
    'WFH': { backgroundColor: 'rgba(255, 206, 86, 0.2)', borderColor: 'rgba(255, 206, 86, 1)' },
    'Leave': { backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)' },
    'Travel': { backgroundColor: 'rgba(153, 102, 255, 0.2)', borderColor: 'rgba(153, 102, 255, 1)' },
    'Others': { backgroundColor: 'rgba(255, 159, 64, 0.2)', borderColor: 'rgba(255, 159, 64, 1)' },
    'Paid_leave':{ backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)' }
};

// Fetch data and generate chart when the chart element is in view
function createChart(workMode, data) {
    const canvas = document.getElementById(`${workMode}-chart`);
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels.map(label => label.split(' ')[0]), // Use only the first part of the name
            datasets: [{
                label: `${workMode} Count`,
                data: data.data,
                backgroundColor: colors[workMode].backgroundColor,
                borderColor: colors[workMode].borderColor,
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
                    text: `${workMode} Attendance Chart`
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Staff Names' }
                },
                y: {
                    title: { display: true, text: 'Count of Work Mode' }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutSine'
            }
        }
    });
}

// Get the current month in YYYY-MM format
const currentMonth = new Date().toISOString().slice(0, 7);

// Load chart data and setup observer for lazy loading
workModes.forEach(workMode => {
    // Create chart container and canvas for each work mode
    const container = document.createElement('div');
    container.classList.add('chart-container');
    container.style.width = '100%'; // Set the width to 100%
    container.style.height = '400px'; // Set a fixed height for the chart container
    
    const canvas = document.createElement('canvas');
    canvas.id = `${workMode}-chart`;
    container.appendChild(canvas);
    document.getElementById('chartsContainer').appendChild(container);

    // Fetch data for each chart
    fetch(`/attendance-chart-data/${workMode}/?month=${currentMonth}`)
        .then(response => response.json())
        .then(data => {
            // Set up Intersection Observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        createChart(workMode, data); // Generate chart when in view
                        observer.unobserve(entry.target); // Stop observing once loaded
                    }
                });
            }, { threshold: 0.3 }); // Trigger when 30% of chart container is visible

            observer.observe(container); // Start observing the chart container
        });
});
